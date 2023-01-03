import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import Web3 from 'web3';
import { Web3Service } from '../../services/web3/web3.service';
import { Helper } from '../../utils/helper';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/auctions', title: 'Home View', icon: '', class: '' },
  { path: '/seller', title: "Seller's View", icon: '', class: '' },
  { path: '/buyer', title: "Buyer's View", icon: '', class: '' },

  { path: '/analytics', title: 'Demo Auction List', icon: '', class: '' }
];

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  walletAddress: string = "";
  walletAddressSubscription: Subscription | null = null;
  navItems: RouteInfo[] = ROUTES;
  helper = Helper;

  constructor(private web3Service: Web3Service) { }

  ngOnInit(): void {
    this.walletAddressSubscription = this.web3Service.walletAddress$.subscribe(x => {
      this.walletAddress = x;
    });
  }

  ngOnDestroy(): void {
    if (this.walletAddressSubscription) this.walletAddressSubscription.unsubscribe();
  }
}


