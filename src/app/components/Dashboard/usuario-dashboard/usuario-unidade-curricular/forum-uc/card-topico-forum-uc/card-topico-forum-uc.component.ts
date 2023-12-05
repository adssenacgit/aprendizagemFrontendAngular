import { Component, Input, OnInit } from '@angular/core';
import { ChapterAssunto } from 'src/app/models/ChapterAssunto';

@Component({
  selector: 'app-card-topico-forum-uc',
  templateUrl: './card-topico-forum-uc.component.html',
  styleUrls: ['./card-topico-forum-uc.component.css']
})
export class CardTopicoForumUcComponent implements OnInit {

  @Input() topico: ChapterAssunto

  constructor() { }

  ngOnInit(): void {
  }

}
