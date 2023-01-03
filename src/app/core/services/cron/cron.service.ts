import { Injectable } from '@angular/core';
import { interval, Subscription, timer } from 'rxjs';
import { Web3Service } from '../web3/web3.service';


@Injectable({
  providedIn: 'root'
})
export class CronService {

  private timerSubscription: Subscription | null = null;

  constructor(private web3Service: Web3Service) { }

  async startCron() {
    this.timerSubscription = interval(20000).subscribe(async event => {
      await this.doJobs();      
    });
  }

  stopCron() {
   if(this.timerSubscription) this.timerSubscription?.unsubscribe();
  }

  private async doJobs(){
    await this.web3Service.getAuctions();
  }
}
