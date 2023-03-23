import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TimelineModule } from 'primeng/timeline';
import { DialogModule } from 'primeng/dialog';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TimelineModule,
    CardModule,
    ButtonModule,
    DialogModule,
  ],
  exports: [TimelineModule, CardModule, ButtonModule, DialogModule],
})
export class PrimengModule {}
