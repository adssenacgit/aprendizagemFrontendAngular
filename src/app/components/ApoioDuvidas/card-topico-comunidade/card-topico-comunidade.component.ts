import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ChapterAssunto } from 'src/app/models/ChapterAssunto';
import { ComentarioService } from 'src/app/services/comentario.service';

@Component({
  selector: 'app-card-topico-comunidade',
  templateUrl: './card-topico-comunidade.component.html',
  styleUrls: ['./card-topico-comunidade.component.css']
})
export class CardTopicoComunidadeComponent implements OnInit {

  @Input() topico: ChapterAssunto;
  curtidas: number;

  constructor(
    private ChapterAssuntoComentario: ComentarioService) { }

  ngOnInit(): void {
    this.ChapterAssuntoComentario.FiltrarChapterAssuntoComentarioPorId(this.topico.id).subscribe(data => this.topico.totalComentarios = data.length)

  }

}
