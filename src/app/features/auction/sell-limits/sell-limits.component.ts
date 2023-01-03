import { Component, OnInit, Inject } from '@angular/core';
import { Web3Service } from 'src/app/core/services/web3/web3.service';
import { Helper } from 'src/app/core/utils/helper';
import { Router } from '@angular/router';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PopupDialogueComponent } from '../../popup-dialogue/popup-dialogue.component';
import { PopupService } from 'src/app/core/services/popup/popup.service';

@Component({
  selector: 'app-sell-limits',
  templateUrl: './sell-limits.component.html',
  styleUrls: ['./sell-limits.component.css']
})
export class SellLimitsComponent implements OnInit {
  qntyReserved = 0;
  qntySold = 0;
  constructor(private web3Service: Web3Service) { }

  ngOnInit(): void {

  }

  async loadTradeData() {
    this.qntySold = this.web3Service.sellerQntySold;
    this.qntyReserved = this.web3Service.sellerReservedQnty;

    console.log(this.qntySold);
  }

}
