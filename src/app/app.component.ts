import { Component } from "@angular/core";
import Web3 from "web3";
import { CronService } from "./core/services/cron/cron.service";
import { NotificationService } from "./core/services/notification/notification.service";
import { Web3Service } from "./core/services/web3/web3.service";

declare global {
  interface Window {
    ethereum: any;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  loaded = false;

  constructor(
    private web3Service: Web3Service,
    private notificationService: NotificationService,
    private cronService: CronService) { }

  async ngOnInit() {
    this.notificationService.createInformMessage("App started");
    await this.web3Service.connectAndSubscribe();
    await this.web3Service.getAuctions();   
    this.loaded = true;
    await this.cronService.startCron();
  }

  ngOnDestroy(): void {
    this.cronService.stopCron();
    this.web3Service.unsubscribe();
  }
}
