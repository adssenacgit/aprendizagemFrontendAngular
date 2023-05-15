import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChapterAssunto } from 'src/app/models/ChapterAssunto';
import { ChapterAssuntoService } from 'src/app/services/chapter-assunto.service';

@Component({
  selector: 'app-apoio-duvidas',
  templateUrl: './apoio-duvidas.component.html',
  styleUrls: ['./apoio-duvidas.component.css']
})
export class ApoioDuvidasComponent implements OnInit {
  
  chapterAssuntos: ChapterAssunto[];

  constructor(
    private _route: ActivatedRoute,
    private chapterAssuntoService: ChapterAssuntoService
  ) {}

  ngOnInit(): void {
    this.chapterAssuntoService.ObterTodos().subscribe((data) => {
      this.chapterAssuntos = data;
      console.log(data);
    });
  }
}
