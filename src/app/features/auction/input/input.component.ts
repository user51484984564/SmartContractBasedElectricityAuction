import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Web3Service } from 'src/app/core/services/web3/web3.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
  tradeLimit = this.web3Service.tradeLimit;
  form = new FormGroup({
    duration: new FormControl(""),
    qnty: new FormControl(""),
    min: new FormControl(""),
    max: new FormControl("")
  })
  constructor(private web3Service: Web3Service) { }

  ngOnInit(): void {

  }


  onSubmit() {
    console.log("On submit values", this.form.value);
    let duration = this.form.get('duration')?.value;
    let max = this.form.get('max')?.value;
    let min = this.form.get('min')?.value;
    let qnty = this.form.get('qnty')?.value;

    if (min && max) {
      this.web3Service.createNewAuction(duration as unknown as number, max as unknown as number, min as unknown as number, qnty as unknown as number);
      this.form.reset();
    } else {
      alert("Incorrect input");
    }
  }
}
