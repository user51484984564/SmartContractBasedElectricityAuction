export class AuctionDetails {
    id: string = "";
    min: string = "";
    max: string = "";
    bid: string = "";
    bidder: string = "";
    qnty: string = "";
    own: string = "";
    unitPrice: string = "";
    blocks: string = "";
    isOwner: boolean = false;
    userBids: string = "";
    userUnitPrice: string = "";
    auctionState: string = "";
    getBalance: string = "";

    constructor(id: string, min: string, max: string, bid: string, bidder: string, qnty: string, own: string, unitPrice: string, blocks: string, userBids: string, userUnitPrice: string, auctionState: string, getBalance: string) {
        this.id = id,
            this.min = min,
            this.max = max,
            this.bid = bid,
            this.bidder = bidder,
            this.qnty = qnty,
            this.own = own,
            this.unitPrice = unitPrice,
            this.blocks = blocks,
            this.userBids = userBids,
            this.userUnitPrice = userUnitPrice,
            this.auctionState = auctionState,
            this.getBalance = getBalance
    }

    setIsOwner(address: string) {
        if (this.own == address)
            this.isOwner = true;
        else
            this.isOwner = false;
    }

}