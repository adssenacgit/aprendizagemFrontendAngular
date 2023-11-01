import { Component, Input, OnInit } from '@angular/core';
import { Chapter } from 'src/app/models/Chapter';
import { ChapterAssunto } from 'src/app/models/ChapterAssunto';
import { ChapterTag } from 'src/app/models/ChapterTag';
import { Usuario } from 'src/app/models/Usuario';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { ChapterAssuntoService } from 'src/app/services/chapter-assunto.service';
import { ChapterService } from 'src/app/services/chapter.service';
import { GrupoService } from 'src/app/services/grupo.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-forum-uc',
  templateUrl: './forum-uc.component.html',
  styleUrls: ['./forum-uc.component.css']
})
export class ForumUcComponent implements OnInit {

  grupoId: number;
  chapter: Chapter;
  chapterAssuntos: ChapterAssunto[]

  busca: string;
  chapterAssuntosTodos: ChapterAssunto[];
  chapterTodos: Chapter[];

  chapterTagTodos: ChapterTag[];


  constructor(
    private grupoService: GrupoService,
    private chapterService: ChapterService,
    private chapterAssuntoService: ChapterAssuntoService,
  ) { }

  ngOnInit(): void {
    this.grupoId = this.grupoService.getGrupoId();
    this.chapterService.ObterChapterByGrupoIdJava(this.grupoId).subscribe({
      next: (response) => {
        this.chapter = response;
      },
      complete: () => {
        this.chapterAssuntoService.ObterChapterAssuntosByChapterIdJava(this.chapter.id).subscribe({
          next: (response) => {
            this.chapterAssuntos = response;
            this.chapterAssuntosTodos = this.chapterAssuntos
          }
        })
      }
    })
  }

  ordernarPorData(order: string) {
    if (order == 'decrescente') {
      this.chapterAssuntos.sort(
        (a, b) =>
          new Date(b.dataCadastro).getDate() -
          new Date(a.dataCadastro).getDate()
      );
    } else if (order == 'crescente') {
      this.chapterAssuntos.sort(
        (a, b) =>
          new Date(a.dataCadastro).getDate() -
          new Date(b.dataCadastro).getDate()
      );
    }
  }

  filtraPorTitulo(busca: string) {
    this.chapterAssuntos = this.chapterAssuntosTodos.filter(
      (value) =>
        value.titulo.toLowerCase().includes(busca) ||
        value.descricao.toLowerCase().includes(busca)
    );
  }

}
