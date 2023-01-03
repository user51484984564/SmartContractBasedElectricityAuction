import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/core/services/web3/web3.service';
import { Helper } from 'src/app/core/utils/helper';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupDialogueComponent } from '../../popup-dialogue/popup-dialogue.component';
import { PopupService } from 'src/app/core/services/popup/popup.service';

@Component({
  selector: 'app-participated-auctions',
  templateUrl: './participated-auctions.component.html',
  styleUrls: ['./participated-auctions.component.css']
})
export class ParticipatedAuctionsComponent implements OnInit {
  contract: any;
  data: any[] = [];
  helper = Helper;
  isSellerViewActive = false;
  qntySold = 0;
  qntyBought = 0;
  constructor(private web3Service: Web3Service,
    private router: Router,
    public dialog: MatDialog,
    private popup: PopupService) { }

  ngOnInit(): void {
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
    this.qntyBought = this.web3Service.myQntyBought;
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
