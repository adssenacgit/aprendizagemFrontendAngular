import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-detalhe-timeline',
  templateUrl: './detalhe-timeline.component.html',
  styleUrls: ['./detalhe-timeline.component.css'],
})
export class DetalheTimelineComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  displayModal: boolean;

  displayBasic: boolean;

  displayBasic2: boolean;

  displayMaximizable: boolean;

  displayPosition: boolean;

  position: string;

  showModalDialog() {
    this.displayModal = true;
  }

  showBasicDialog() {
    this.displayBasic = true;
  }

  showBasicDialog2() {
    this.displayBasic2 = true;
  }

  showMaximizableDialog() {
    this.displayMaximizable = true;
  }

  showPositionDialog(position: string) {
    this.position = position;
    this.displayPosition = true;
  }
}
