import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.css'],
})
export class ErrorDialogComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}

  ngOnInit(): void {}
}
