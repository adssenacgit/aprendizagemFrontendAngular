import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChapterAssunto } from 'src/app/models/ChapterAssunto';
import { ChapterAssuntoService } from 'src/app/services/chapter-assunto.service';

@Component({
  selector: 'app-chapter-listagem-geral',
  templateUrl: './chapter-listagem-geral.component.html',
  styleUrls: ['./chapter-listagem-geral.component.css'],
})
export class ChapterListagemGeralComponent implements OnInit {

  chapterAssuntos: ChapterAssunto[];

  constructor(
    private _route: ActivatedRoute,
    private chapterAssuntoService: ChapterAssuntoService
  ) {}

  ngOnInit(): void {
    this.chapterAssuntoService.ObterTodos().subscribe((data) => {
      this.chapterAssuntos = data;
    });
  }
}