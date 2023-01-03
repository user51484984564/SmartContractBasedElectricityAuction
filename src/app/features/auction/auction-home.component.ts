import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Web3Service } from 'src/app/core/services/web3/web3.service';

@Component({
  selector: 'app-auction-home',
  templateUrl: './auction-home.component.html',
  styleUrls: ['./auction-home.component.css']
})
export class AuctionHomeComponent implements OnInit {

  count = 0;
  countSubscription: Subscription | null = null;

  constructor(private web3Service: Web3Service) { }

  async ngOnInit() {
    this.countSubscription = this.web3Service.auctionsCount$.subscribe(x => {
      this.count = x;
    });
  }

}
