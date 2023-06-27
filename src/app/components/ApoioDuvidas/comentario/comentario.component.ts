import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChapterAssuntoComentario } from 'src/app/models/ChapterAssuntoComentario';
import { ComentarioService } from 'src/app/services/comentario.service';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApoioDuvidasComponent } from '../apoio-duvidas.component';
import { ChapterAssunto } from 'src/app/models/ChapterAssunto';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css']
})
export class ComentarioComponent implements OnInit {

  form:FormGroup

  comentario: ChapterAssuntoComentario = new ChapterAssuntoComentario();

  comentarios: ChapterAssuntoComentario[] = [];

  constructor(
    private fb:FormBuilder,
    private route: ActivatedRoute, 
    private comentarioService: ComentarioService, ) { }

  ngOnInit() {
    let id = this.route.snapshot.params["id"]
    this.comentarioService.FiltrarChapterAssuntoComentarioPorId(id).subscribe((data)=>{
      this.comentario.chapterAssuntoId= id;
      this.comentarios = data;
    });

    this.form = this.fb.group({
      comentario: [null,[Validators.required,Validators.minLength(5)]]
    });
  }

  onSubmit() {

    this.comentario.texto = this.form.value.comentario

    console.log(this.comentarioService.NovoChapterAssuntoComentario(this.comentario))
  }

  onCancel() {
    console.log("onCancel");
    this.form.reset();
  }  

}