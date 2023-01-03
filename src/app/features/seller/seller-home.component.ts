import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/core/services/web3/web3.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {

  constructor(private web3Service: Web3Service) { }

  ngOnInit(): void {
    
  }


}
