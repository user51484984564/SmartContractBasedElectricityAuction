import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Web3 from 'web3';
import { AbiItem } from 'web3-eth/node_modules/web3-utils'
import { Auction } from '../../models/auction';
import { AuctionData } from '../../models/auction-data';
import { AuctionDetails } from '../../models/auction-details';
import { NotificationService } from '../notification/notification.service';
import { ABI, ADDRESS } from './abis';


@Injectable({
  providedIn: 'root'
})
export class Web3Service {
  public sellerQntySold = 0;
  public myQntySold: any;
  public sellerReservedQnty = 0;
  public myReservedQnty: any;
  public tradeLimit = 0;
  public buyerQntybought = 0;
  public myQntyBought: any;
  public auctionTotalQnty = 0;
  private web3: Web3 = new Web3();
  private walletAddress: string = '';
  private contract: any;
  private networkName: string = '';

  constructor(private notificationService: NotificationService) { }

  async connectAndSubscribe() {

    if (window['ethereum']) {
      await this.setup();
      console.log(this.networkName);
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        this.notificationService.createInformMessage("Account changed");
        window.location.reload();
      });

      window.ethereum.on('networkChanged', (networkId: number) => {
        window.location.reload();
      });
    }
    else {
      alert('MetaMask is not installed!');
    }
  }

  async setup() {
    let ethereum = window['ethereum'];
    this.setupWeb3(ethereum);
    this.setupAddress((await this.web3.eth.requestAccounts())[0]);
    this.setupContract(
      new this.web3.eth.Contract(ABI as AbiItem[], ADDRESS)
    );
    this.setupNetwork(
      (await this.web3.eth.net.getNetworkType())
    );
  }

  unsubscribe() {
    window.ethereum.removeListener('accountsChanged', () => { });
    window.ethereum.removeListener('networkChanged', () => { });
  }

  private _auctions: BehaviorSubject<Auction[]> = new BehaviorSubject<Auction[]>([]);

  get auctions$(): Observable<Auction[]> {
    return this._auctions.asObservable();
  }


  // Keiciam

  async getAuctionData() {
    let auctionsData: AuctionData[] = [];
    let owners: any[] = await this.contract.methods.getOwnersData().call();
    let auctionCount = await this.contract.methods.getAuctionCount().call();
    let contractAddress: any[] = await this.contract.methods.getAuctions().call();
    let minPrices: any[] = await this.contract.methods.getMinPricesData().call();
    let maxPrices: any[] = await this.contract.methods.getFinalPricesData().call();
    let allQntys: any[] = await this.contract.methods.getQntysData().call();
    let finalBlocks: any[] = await this.contract.methods.getBlocksData().call();
    let currentBlock = await this.web3.eth.getBlockNumber();
    let qntySold = 0;
    let reservedQnty = 0;
    let qntyBought = 0;
    let totalQnty = 0;

    for (let i = 0; i < auctionCount; i++) {
      let auctionData = new AuctionData();

      auctionData.state = await this.contract.methods.getAuctionState(i).call();
      auctionData.currentBid = await this.contract.methods.getHighestBindingBid(i).call();
      auctionData.contractBalance = await this.contract.methods.getBalance(i).call();
      auctionData.userBids = await this.contract.methods.getUserBids(i).call({ from: this.walletAddress });
      auctionData.winningBidder = await this.contract.methods.getHighestBidder(i).call();
      auctionData.id = i;
      auctionData.address = contractAddress[i];
      auctionData.qnty = allQntys[i];
      auctionData.timeLeft = 0;
      auctionData.minPrice = minPrices[i];
      auctionData.maxPrice = maxPrices[i];
      auctionData.status = true;
      auctionData.endBlock = finalBlocks[i];
      auctionData.pricePerUnit = +(+auctionData.currentBid / +auctionData.qnty).toFixed(2);
      auctionData.auctionOwner = owners[i];

      if ((auctionData.endBlock - currentBlock) > 0) {
        auctionData.timeLeft = auctionData.endBlock - currentBlock;
      } else {
        auctionData.timeLeft = 0;
      }

      if (auctionData.timeLeft > 0 && auctionData.currentBid < auctionData.maxPrice && auctionData.state == "Ongoing") {
        auctionData.isActive = true;
      } else {
        auctionData.isActive = false;
      }

      if ((auctionData.timeLeft == 0 || auctionData.state == "Ended" || auctionData.state == "UserCancelled" || auctionData.state == "Failed") && auctionData.currentBid >= auctionData.minPrice) {
        auctionData.isSuccessful = true;
      } else {
        auctionData.isSuccessful = false;
      }

      if (this.walletAddress == owners[i]) {
        auctionData.isOwnerLoading = true;
      } else {
        auctionData.isOwnerLoading = false;
      }

      if (auctionData.isOwnerLoading && auctionData.isSuccessful) {
        qntySold = this.sellerQntySold + +auctionData.qnty;
        this.sellerQntySold = qntySold;
      }

      if (auctionData.isOwnerLoading && auctionData.isActive) {
        reservedQnty = this.sellerReservedQnty + +auctionData.qnty;
        this.sellerReservedQnty = reservedQnty;
      }

      if (auctionData.isSuccessful && auctionData.winningBidder == this.walletAddress) {
        qntyBought = this.buyerQntybought + +auctionData.qnty;
        this.buyerQntybought = qntyBought;
      }

      if (auctionData.isSuccessful) {
        totalQnty = totalQnty + +auctionData.qnty;

      }
      auctionsData.push(auctionData);
      this.auctionTotalQnty = totalQnty;
      this.myQntySold = qntySold;
      this.myReservedQnty = reservedQnty;
      this.myQntyBought = this.buyerQntybought;
    }
    this.sellerQntySold = 0;
    this.sellerReservedQnty = 0;
    this.buyerQntybought = 0;
    totalQnty = 0;
    return auctionsData;


  }


  // Keiciam
  async getAuctions() {
    let auctions: Auction[] = [];
    let auctionCount = await this.getAuctionCount();
    let data: any[] = await this.contract.methods.getAuctions().call();
    let data1: any[] = await this.contract.methods.getOwnersData().call();
    let data2: any[] = await this.contract.methods.getMinPricesData().call();
    let data3: any[] = await this.contract.methods.getFinalPricesData().call();
    let data4: any[] = await this.contract.methods.getQntysData().call();
    let data5: any[] = await this.contract.methods.getBlocksData().call();
    let currentBlock = await this.web3.eth.getBlockNumber();

    for (let i = 0; i < auctionCount; i++) {
      let auction = new Auction();
      auction.id = data[i];
      // auction.name = data[i];
      auction.owner = data1[i];
      auction.minPrice = data2[i];
      auction.finalPrice = data3[i];
      auction.qnty = data4[i];
      auction.endBlock = data5[i];
      let state = await this.contract.methods.getAuctionState(i).call();

      if ((auction.endBlock - currentBlock) > 0) {
        auction.timeLeft = auction.endBlock - currentBlock;
      } else {
        auction.timeLeft = 0;
      }

      if (this.walletAddress == auction.owner) {
        auction.isLoadedByOwner = true;
      } else {
        auction.isLoadedByOwner = false;
      }

      if (auction.timeLeft > 0 && state == "Ongoing") {
        auction.auctionState = true;
      } else {
        auction.auctionState = false;
      }

      auctions.push(auction);

    }

    // let auctions = data.map(x => {
    //   let auction = new Auction();
    //   auction.id = x;
    //   return auction;
    // })

    this._auctions.next(auctions);

  }

  async createNewAuction(duration: number, max: number, min: number, qnty: number,) {
    await this.createAuction(this.walletAddress, duration, max, min, qnty,);
  }

  private async createAuction(address: string, duration: number, max: number, min: number, qnty: number) {
    await this.contract.methods.CreateAuction(duration, max, min, qnty).send({ from: address, gas: 3000000, gasPrice: null });
  }

  private _auctionCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  get auctionsCount$(): Observable<number> {
    return this._auctionCount.asObservable();
  }

  // Get count of all auctions
  async getAuctionCount() {
    let count = await this.contract.methods.getAuctionCount().call();
    this._auctionCount.next(count);
    return count;
  }

  // Cancel Auction (only owner can cancel auction, if not owner, transaction reverted)

  async cancelSelectedAuction(selectedContractIndex: number) {
    await this.cancelAuction(this.walletAddress, selectedContractIndex);
  }

  private async cancelAuction(address: string, selectedContractIndex: number) {
    await this.contract.methods.cancelAuction(selectedContractIndex).send({ from: address, gas: 3000000, gasPrice: null });
  }

  // Finish Auction (if auction ended, and bid > min price, then users can request contract to return or transfer funds)

  async finishSelectedAuction(selectedContractIndex: number) {
    await this.finishAuction(this.walletAddress, selectedContractIndex);
  }

  private async finishAuction(address: string, selectedContractIndex: number) {
    await this.contract.methods.finishAuction(selectedContractIndex).send({ from: address, gas: 3000000, gasPrice: null });
  }

  // Place bid function

  async placeBidSelectedAuction(selectedContractIndex: number, bid: string) {
    await this.placeBid(this.walletAddress, selectedContractIndex, bid);
  }

  private async placeBid(address: string, selectedContractIndex: number, bid: string) {

    try {
      await this.contract.methods.placeBid(selectedContractIndex).send({ from: address, gas: 3000000, gasPrice: null, value: bid });
    } catch (error) {
      console.error(error);
      this.notificationService.createErrorMessage("Error or contract call");
    }

  }

  async getAuction(index: number) {
    let ac = await this.contract.methods.auctions(index).call();
    let min = await this.contract.methods.getAuctionMinPrice(index).call();
    let max = await this.contract.methods.getAuctionFinalPrice(index).call();
    let bid = await this.contract.methods.getHighestBindingBid(index).call();
    let bidder = await this.contract.methods.getHighestBidder(index).call();
    let qnty = await this.contract.methods.getQnty(index).call();

    let own = await this.contract.methods.getAuctionOwner(index).call();

    // get blocks left till auction end
    // let blocks = await this.contract.methods.getBlocksLeft(index).call(); 

    let userBids = await this.contract.methods.getUserBids(index).call({ from: this.walletAddress });

    let auctionState = await this.contract.methods.getAuctionState(index).call();

    let getBalance = await this.contract.methods.getBalance(index).call();

    let endBlock = await this.contract.methods.getEndBlock(index).call();
    let currentBlock = await this.contract.methods.getCurrentBlock(index).call();

    let userUnitPrice = (userBids / qnty).toString();

    let unitPrice = (bid / qnty).toString();

    let blocks = "";

    if (currentBlock <= endBlock) {
      blocks = (endBlock - currentBlock).toString();
    } else {
      blocks = "0";
    }


    let auctionDetails = new AuctionDetails(ac, min, max, bid, bidder, qnty, own, unitPrice, blocks, userBids, userUnitPrice, auctionState, getBalance);
    auctionDetails.setIsOwner(this.walletAddress);
    //console.log("auctionDetails", auctionDetails);
    return auctionDetails;
  }

  private _walletAddress: BehaviorSubject<string> = new BehaviorSubject<string>('');
  get walletAddress$(): Observable<string> {
    return this._walletAddress.asObservable();
  }

  private _networkName: BehaviorSubject<string> = new BehaviorSubject<string>('');
  get networkName$(): Observable<string> {
    return this._networkName.asObservable();
  }

  private setupAddress(walletAddress: string) {
    this.walletAddress = walletAddress;
    this._walletAddress.next(walletAddress);
  }

  private setupNetwork(networkName: string) {
    this.networkName = networkName;
    this._networkName.next(networkName);
  }

  private setupContract(contract: any) {
    this.contract = contract;
  }

  private setupWeb3(ethereum: any) {
    this.web3 = new Web3(ethereum);
  }
}
