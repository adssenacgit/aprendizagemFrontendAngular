import { Component, OnInit } from '@angular/core';
import { Comentario } from 'src/app/models/comentario';
import { ComentarioService } from 'src/app/services/comentario.service';



@Component({
  selector: 'app-comentarios',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css']
})
export class ComentarioComponent implements OnInit {

  comentarios: Comentario[] = [];

  constructor(private comentarioService: ComentarioService) { }

  ngOnInit() {
    this.comentarioService.getComentarios()
      .subscribe(comentarios => this.comentarios = comentarios);
  }

}
