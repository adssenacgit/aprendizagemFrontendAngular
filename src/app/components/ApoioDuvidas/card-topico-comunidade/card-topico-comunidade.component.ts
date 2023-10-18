import { Component, Input, OnInit } from '@angular/core';
import { ChapterAssunto } from 'src/app/models/ChapterAssunto';

@Component({
  selector: 'app-card-topico-comunidade',
  templateUrl: './card-topico-comunidade.component.html',
  styleUrls: ['./card-topico-comunidade.component.css']
})
export class CardTopicoComunidadeComponent implements OnInit {

  @Input() topico: ChapterAssunto

  constructor() { }

  ngOnInit(): void {
  }

}
