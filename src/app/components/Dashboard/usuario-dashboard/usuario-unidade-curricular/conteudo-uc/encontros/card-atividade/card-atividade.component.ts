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

  constructor() { }


}
