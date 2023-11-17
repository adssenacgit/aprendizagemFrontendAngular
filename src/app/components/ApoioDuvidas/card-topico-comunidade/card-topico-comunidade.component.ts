import { Component, Input } from '@angular/core';
import { ChapterAssunto } from 'src/app/models/ChapterAssunto';

@Component({
  selector: 'app-card-topico-comunidade',
  templateUrl: './card-topico-comunidade.component.html',
  styleUrls: ['./card-topico-comunidade.component.css']
})
export class CardTopicoComunidadeComponent  {

  @Input() topico: ChapterAssunto;

  constructor() { }



}
