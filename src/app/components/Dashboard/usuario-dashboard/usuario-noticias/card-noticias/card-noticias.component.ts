import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ChapterAssunto } from 'src/app/models/ChapterAssunto';
import { ChapterAssuntoService } from 'src/app/services/chapter-assunto.service';

@Component({
  selector: 'app-card-noticias',
  templateUrl: './card-noticias.component.html',
  styleUrls: ['./card-noticias.component.css']
})
export class CardNoticiasComponent implements OnInit {
  listaNoticias: ChapterAssunto[] = [];

  constructor(private chapterAssuntoService: ChapterAssuntoService, public router: Router) {}

  ngOnInit(): void {
    this.chapterAssuntoService.ObterNoticiasJava().subscribe((data) => {
      this.listaNoticias = data;
      console.log(data);
    });
  }

  verNoticiaCompleta(news: ChapterAssunto) {
    this.router.navigate(['noticias/detalhes', news.id]);
  }
}
