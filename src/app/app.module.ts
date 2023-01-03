import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './core/components/footer/footer.component';
import { NavComponent } from './core/components/nav/nav.component';
import { AnalyticsHomeComponent } from './features/analytics/analytics-home.component';
import { AuctionHomeComponent } from './features/auction/auction-home.component';
import { InputComponent } from './features/auction/input/input.component';
import { ListComponent } from './features/auction/list/list.component';
import { BuyersHomeComponent } from './features/buyer/buyers-home.component';
import { SellerHomeComponent } from './features/seller/seller-home.component';
import { SharedModule } from './shared/shared/shared.module';
import { MeterComponent } from './features/meter/meter.component';
import { AuctionDataComponent } from './features/auction/auction-data/auction-data.component';
import { PopupDialogueComponent } from './features/popup-dialogue/popup-dialogue.component';
import { ParticipatedAuctionsComponent } from './features/auction/participated-auctions/participated-auctions.component';
import { SellLimitsComponent } from './features/auction/sell-limits/sell-limits.component';
import { DealDataComponent } from './features/deal-data/deal-data.component';

@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    ListComponent,
    NavComponent,
    FooterComponent,
    AuctionHomeComponent,
    AnalyticsHomeComponent,
    BuyersHomeComponent,
    SellerHomeComponent,
    MeterComponent,
    AuctionDataComponent,
    PopupDialogueComponent,
    ParticipatedAuctionsComponent,
    SellLimitsComponent,
    DealDataComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
