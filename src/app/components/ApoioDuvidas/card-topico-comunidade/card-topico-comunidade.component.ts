import { Component, Input, OnInit } from '@angular/core';
import { ChapterAssunto } from 'src/app/models/ChapterAssunto';
import { ChapterAssuntoComentario } from 'src/app/models/ChapterAssuntoComentario';
import { ComentarioService } from 'src/app/services/comentario.service';
import { CurtidaService } from 'src/app/services/curtida.service';

@Component({
  selector: 'app-card-topico-comunidade',
  templateUrl: './card-topico-comunidade.component.html',
  styleUrls: ['./card-topico-comunidade.component.css']
})
export class CardTopicoComunidadeComponent implements OnInit {

  @Input() topico: ChapterAssunto;
  curtidas: number;

  constructor(
    private ChapterAssuntoComentario: ComentarioService,
    private Curtida: CurtidaService, ) { }

  ngOnInit(): void {
    this.ChapterAssuntoComentario.FiltrarChapterAssuntoComentarioPorId(this.topico.id).subscribe(data => this.topico.totalComentarios = data.length)

  }

}
