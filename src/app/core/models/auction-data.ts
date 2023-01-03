export class AuctionData {
    id: any = 0;
    address: string = "";
    state: string = "";
    qnty: string = "";
    currentBid: string = "";
    timeLeft: number = 0;
    minPrice: string = "";
    maxPrice: string = "";
    status: boolean = true;
    endBlock: number = 0;
    isOwnerLoading: boolean = true;
    isSuccessful: boolean = false;
    isActive: boolean = true;
    userBids: number = 0;
    contractBalance: number = 0;
    winningBidder: string = "";
    pricePerUnit: number = 0;
    auctionOwner: string = "";


    constructor() {

    }


}