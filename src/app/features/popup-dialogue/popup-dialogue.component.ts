import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupService } from 'src/app/core/services/popup/popup.service';
import { Helper } from 'src/app/core/utils/helper';
import { Web3Service } from 'src/app/core/services/web3/web3.service';
import { FormControl, FormGroup } from '@angular/forms';



export interface DialogData {

}

@Component({
  selector: 'app-popup-dialogue',
  templateUrl: './popup-dialogue.component.html',
  styleUrls: ['./popup-dialogue.component.css']
})
export class PopupDialogueComponent implements OnInit {

  public popupIndex: number = 0;
  public singleAuctionData: any[] = [];
  helper = Helper;
  userTotalBid = 0;
  newTotalBid = 0;
  sellerViewActive: boolean = false;


  form = new FormGroup({
    bid: new FormControl("")
  })

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private popup: PopupService,
    private web3Service: Web3Service
  ) { }

  ngOnInit(): void {
    this.popupIndex = this.popup.modalIndex;
    this.singleAuctionData = this.popup.singleAuctionData;
    console.log(this.singleAuctionData);
    this.userTotalBid = parseInt(this.singleAuctionData[this.popupIndex].userBids);
    this.newTotalBid = parseInt(this.singleAuctionData[this.popupIndex].userBids);
    this.sellerViewActive = this.popup.sellerView;
  }

  async cancel() {
    this.web3Service.cancelSelectedAuction(this.popupIndex);
  }

  async finish() {
    this.web3Service.finishSelectedAuction(this.popupIndex);
  }

  onSubmit() {
    console.log("On submit values", this.form.value);
    let bid = this.form.get('bid')?.value;

    if (bid) {
      this.web3Service.placeBidSelectedAuction(this.popupIndex, bid);
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
