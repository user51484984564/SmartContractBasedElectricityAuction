import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _snackBar: MatSnackBar) { }

  createInformMessage(message: string) {
    let styles = ['mat-toolbar', 'mat-primary'];
    this.createMessage(message, styles);
  }

  createErrorMessage(message: string) {
    let styles = ['mat-toolbar', 'mat-warn'];
    this.createMessage(message, styles);
  }

  private createMessage(message: string, styles: string[]) {
    this._snackBar.open(message, undefined, {
      duration: 3000,
      panelClass: styles
    });
  }
}
