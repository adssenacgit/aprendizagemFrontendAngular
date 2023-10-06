import { Component, Input } from '@angular/core';
import { ObjetoAprendizagem } from 'src/app/models/ObjetoAprendizagem';

@Component({
  selector: 'app-card-objeto-aprendizagem',
  templateUrl: './card-objeto-aprendizagem.component.html',
  styleUrls: ['./card-objeto-aprendizagem.component.css']
})
export class CardObjetoAprendizagemComponent {

  @Input()
  objeto: ObjetoAprendizagem;

  constructor() { }


}
