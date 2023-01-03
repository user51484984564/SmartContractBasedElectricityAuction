import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PopupService {


  public modalIndex: number = 0;
  public singleAuctionData: any[] = [];
  public sellerView: boolean = false;

  constructor() { }
}
