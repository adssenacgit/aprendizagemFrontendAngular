import { Component, Input, OnInit } from '@angular/core';
import { Chapter } from 'src/app/models/Chapter';
import { ChapterAssunto } from 'src/app/models/ChapterAssunto';
import { ChapterAssuntoService } from 'src/app/services/chapter-assunto.service';
import { ChapterService } from 'src/app/services/chapter.service';
import { GrupoService } from 'src/app/services/grupo.service';

@Component({
  selector: 'app-forum-uc',
  templateUrl: './forum-uc.component.html',
  styleUrls: ['./forum-uc.component.css']
})
export class ForumUcComponent implements OnInit {

  grupoId: number;
  chapter: Chapter;
  chapterAssuntos: ChapterAssunto[]

  constructor(
    private grupoService: GrupoService,
    private chapterService: ChapterService,
    private chapterAssuntoService: ChapterAssuntoService
  ) { }

  ngOnInit(): void {
    this.grupoId = this.grupoService.getGrupoId();
    this.chapterService.ObterChapterByGrupoIdJava(this.grupoId).subscribe({
      next: (response) => {
        this.chapter = response;
      },
      complete: () => {
        this.chapterAssuntoService.ObterChapterAssuntosByChapterId(this.chapter.id).subscribe({
          next: (response) => {
            this.chapterAssuntos = response;
            console.log(this.chapterAssuntos)
          }
        })
      }
    })
  }

}
