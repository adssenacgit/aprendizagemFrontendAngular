import { Component, Input, OnInit } from '@angular/core';
import { Atividade } from 'src/app/models/Atividade';

@Component({
  selector: 'app-card-atividade',
  templateUrl: './card-atividade.component.html',
  styleUrls: ['./card-atividade.component.css']
})
export class CardAtividadeComponent {

  @Input()
  atividade: Atividade;

  checked: boolean = true;

  constructor() { }

  formatarDataComHora(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month} ${hours}:${minutes}`;
  }
}
