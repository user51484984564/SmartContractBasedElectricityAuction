import { compileDeclareDirectiveFromMetadata } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Declaration } from 'src/app/core/models/declaration';
import { NewDeclaration } from 'src/app/core/models/new-declaration';
import { DeclarationService } from 'src/app/core/services/declaration/declaration.service';
import { NotificationService } from 'src/app/core/services/notification/notification.service';
import { Calculator } from 'src/app/core/utils/calculator';
import { MeterValidator } from 'src/app/core/utils/meter-validator';
import { providers } from 'web3modal';

@Component({
  selector: 'app-meter',
  templateUrl: './meter.component.html',
  styleUrls: ['./meter.component.css']
})
export class MeterComponent implements OnInit {

  balanceSum = 0;

  form = new FormGroup({
    period: new FormControl(""),
    from: new FormControl(0),
    to: new FormControl(0),
    generated: new FormControl(0),
  })

  periodOptions: string[] = [
    '2022.01',
    '2022.02',
    '2022.03',
    '2022.04',
    '2022.05',
    '2022.06',
    '2022.07',
    '2022.08',
    '2022.09',
    '2022.10',
    '2022.11',
    '2022.12',
  ];

  declarationsSubscription = new Subscription();
  declarations: Declaration[] = [];

  constructor(
    private declarationService: DeclarationService,
    private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.subscribe();
    this.declarationService.read();
  }

  subscribe() {
    this.declarationsSubscription = this.declarationService.declarations$
      .subscribe(declarations => {
        this.declarations = declarations;
        this.balanceSum = Calculator.CurrentBalance(this.declarations);
        this.declarationService.totalBalance = this.balanceSum;
        this.setFrom();
        //ir toliau atlikti kazkokius veiksmus kiekviena karta kai atsinaujina duomenys

      });
  }

  onSubmit() {
    let period: any = this.form.get('period')?.value;
    let from: any = this.form.get('from')?.value;
    let to: any = this.form.get('to')?.value;
    let generated: any = this.form.get('generated')?.value;

    let newDeclaration = new NewDeclaration(period, from, to, generated);

    let validator = new MeterValidator(this.periodOptions, this.declarations, period, from, to);

    if (validator.isValid()) {
      this.declarationService.create(newDeclaration);
    } else {
      this.notificationService.createErrorMessage(validator.errorMessage);
    }
    this.form.reset();
    this.setFrom();
  }

  clear() {
    this.declarationService.clear();
    this.form.reset();
    this.setFrom();
  }

  setFrom() {
    if (this.declarations.length > 0) {
      let from = this.declarations[this.declarations.length - 1].to;
      this.form.controls.from.setValue(from);
    }
  }
}
