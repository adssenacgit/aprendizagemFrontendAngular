import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChapterAssuntoComentario } from 'src/app/models/ChapterAssuntoComentario';
import { ComentarioService } from 'src/app/services/comentario.service';

import { ApoioDuvidasComponent } from '../apoio-duvidas.component';
import { ChapterAssunto } from 'src/app/models/ChapterAssunto';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css']
})
export class ComentarioComponent implements OnInit {

  comentarios: ChapterAssuntoComentario[] = [];

  constructor(private route: ActivatedRoute, private comentarioService: ComentarioService, ) { }

  ngOnInit() {
    let id = this.route.snapshot.params["id"]
    this.comentarioService.FiltrarChapterAssuntoComentarioPorId(id).subscribe((data)=>{
      this.comentarios = data;
    });
  }

}
export { ChapterAssuntoComentario };