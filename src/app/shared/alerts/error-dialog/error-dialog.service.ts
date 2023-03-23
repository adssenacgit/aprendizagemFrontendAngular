import { MatDialog } from '@angular/material/dialog';
import { Injectable } from '@angular/core';
import { ErrorDialogComponent } from './error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private _dialog: MatDialog) { }

  onError = (errorMessage: string) => {
    this._dialog.open(ErrorDialogComponent, {
      data: errorMessage,
    });
  };
}
