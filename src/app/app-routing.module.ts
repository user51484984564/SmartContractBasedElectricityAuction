import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnalyticsHomeComponent } from './features/analytics/analytics-home.component';
import { AuctionHomeComponent } from './features/auction/auction-home.component';
import { BuyersHomeComponent } from './features/buyer/buyers-home.component';
import { SellerHomeComponent } from './features/seller/seller-home.component';

const routes: Routes = [
  { path: 'seller', component: SellerHomeComponent },
  { path: 'buyer', component: BuyersHomeComponent },
  { path: 'auctions', component: AuctionHomeComponent },
  { path: 'analytics', component: AnalyticsHomeComponent },
  { path: '', redirectTo: '/auctions', pathMatch: 'full'},
  { path: '**', component: AuctionHomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
