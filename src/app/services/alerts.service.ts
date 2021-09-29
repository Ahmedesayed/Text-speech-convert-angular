import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  private durationInSeconds = 5 * 1000;

  constructor(private _snackBar: MatSnackBar) { }

  showSnakBar(msg: string, pClass: 'error' | 'success' = 'error') {
    return this._snackBar.open(msg, 'Close', { duration: this.durationInSeconds, verticalPosition: pClass == 'error' ? 'top' : 'bottom', panelClass: 'snackbar-'+pClass });
  }
}
