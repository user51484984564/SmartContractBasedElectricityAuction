import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Auction } from 'src/app/core/models/auction';
import { AuctionDetails } from 'src/app/core/models/auction-details';
import { Web3Service } from 'src/app/core/services/web3/web3.service';
import { Helper } from 'src/app/core/utils/helper';
import { Router } from '@angular/router';
// import { mockAuctions } from 'src/app/mock/mock-auctions';



@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  userTotalBid = 0;
  newTotalBid = 0;
  timeLeft = 0;
  isAuctionRunning = true;
  selectedContractIndex = 0;
  isSellerViewActive = false;
  auctionsSubscription: Subscription | null = null;
  auctions: Auction[] = [];
  auctionDetails: AuctionDetails | null = null;
  helper = Helper;

  form = new FormGroup({
    bid: new FormControl("")
  })

  constructor(private web3Service: Web3Service, private router: Router) { }

  async ngOnInit() {
    this.subscribe();
    if (this.router.url == "/seller") {
      this.isSellerViewActive = true;
    } else {
      this.isSellerViewActive = false;
    }
    console.log(this.isSellerViewActive);
  }

  subscribe() {
    this.auctionsSubscription = this.web3Service.auctions$.subscribe(auctions => {
      this.auctions = auctions;
    })
  }

  loading: boolean = false;

  async getDetails(index: any) {
    this.auctionDetails = null;
    this.loading = true;
    this.auctionDetails = await this.web3Service.getAuction(index);
    this.loading = false;
    this.selectedContractIndex = index;

    this.newTotalBid = parseInt(this.auctionDetails.userBids);
    this.userTotalBid = parseInt(this.auctionDetails.userBids);
    this.timeLeft = parseInt(this.auctionDetails.blocks);
    if (this.auctionDetails.auctionState == "Ongoing" && this.timeLeft != 0) {
      this.isAuctionRunning = true;
    } else {
      this.isAuctionRunning = false;
    }
  }

  ngOnDestroy(): void {
    if (this.auctionsSubscription) this.auctionsSubscription.unsubscribe();
  }

  async cancel() {
    this.web3Service.cancelSelectedAuction(this.selectedContractIndex);
  }

  async finish() {
    this.web3Service.finishSelectedAuction(this.selectedContractIndex);
  }

  onSubmit() {
    console.log("On submit values", this.form.value);
    let bid = this.form.get('bid')?.value;

    if (bid) {
      this.web3Service.placeBidSelectedAuction(this.selectedContractIndex, bid);
      this.form.reset();
    } else {
      // yra daugiau mygtuku formoj, todel trigerina, jeigu input'as empty
      // alert("Incorrect input");
    }
  }

  valuechange(newValue: any) {
    this.userTotalBid = newValue + this.newTotalBid;
  }



}



