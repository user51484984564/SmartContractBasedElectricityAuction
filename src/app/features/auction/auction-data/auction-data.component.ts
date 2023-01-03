import { Component, OnInit, Inject } from '@angular/core';
import { Web3Service } from 'src/app/core/services/web3/web3.service';
import { Helper } from 'src/app/core/utils/helper';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupDialogueComponent } from '../../popup-dialogue/popup-dialogue.component';
import { PopupService } from 'src/app/core/services/popup/popup.service';
import { DeclarationService } from 'src/app/core/services/declaration/declaration.service';



@Component({
  selector: 'app-auction-data',
  templateUrl: './auction-data.component.html',
  styleUrls: ['./auction-data.component.css']
})
export class AuctionDataComponent implements OnInit {
  contract: any;
  data: any[] = [];
  helper = Helper;
  isSellerViewActive = false;
  qntySold = 0;
  qntyReserved = 0;
  tradeLimit = 0;
  constructor(
    private web3Service: Web3Service,
    private declarationService: DeclarationService,
    private router: Router,
    public dialog: MatDialog,
    private popup: PopupService) { }

  ngOnInit(): void {
    if (this.router.url == "/seller") {
      this.isSellerViewActive = true;
    } else {
      this.isSellerViewActive = false;
    }
    console.log(this.isSellerViewActive);
    this.popup.sellerView = this.isSellerViewActive;
    this.loadAuctionData();
  }


  loading: boolean = false;
  isOngoing: boolean = false;

  async loadAuctionData() {

    this.loading = true;
    let allAuctionData = await this.web3Service.getAuctionData();
    this.data = allAuctionData;
    this.popup.singleAuctionData = this.data;
    this.loading = false;
    this.qntySold = this.web3Service.myQntySold;
    this.qntyReserved = this.web3Service.myReservedQnty;
    this.tradeLimit = this.declarationService.totalBalance - this.qntySold - this.qntyReserved;
    this.web3Service.tradeLimit = this.tradeLimit;
  }

  setOngoing() {
    if (this.isOngoing == false) {
      this.isOngoing = true;
    } else if (this.isOngoing == true) {
      this.isOngoing = false;
    }
    console.log(this.isOngoing);
  }

  openDialog(i: number) {
    this.popup.modalIndex = i;
    this.dialog.open(PopupDialogueComponent);
  }

}
