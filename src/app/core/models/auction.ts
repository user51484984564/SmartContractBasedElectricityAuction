export class Auction {
    [x: string]: any;
    id: any = 0;
    // name: string = "";
    owner: string = "";
    minPrice: string = "";
    finalPrice: string = "";
    qnty: string = "";
    endBlock: number = 0;
    timeLeft: number = 0;
    isLoadedByOwner: boolean = false;
    auctionState: boolean = false;
}