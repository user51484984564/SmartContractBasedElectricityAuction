import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Web3Service } from '../../services/web3/web3.service';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  count = 0;
  qnty = 0;
  countSubscription: Subscription | null = null;

  constructor(
    private web3Service: Web3Service) { }

  async ngOnInit() {
    this.countSubscription = this.web3Service.auctionsCount$.subscribe(x => {
      this.count = x;
    });
    this.qnty = this.web3Service.auctionTotalQnty
  }

}
