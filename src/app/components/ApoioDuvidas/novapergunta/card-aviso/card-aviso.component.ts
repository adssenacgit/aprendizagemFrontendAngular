import { Component } from '@angular/core';

@Component({
  selector: 'app-card-aviso',
  templateUrl: './card-aviso.component.html',
  styleUrls: ['./card-aviso.component.css']
})
export class CardAvisoComponent {
  cardAberto = true;

  fecharCard() {
    this.cardAberto = false;
  }
}
