import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChapterAssuntoComentario } from 'src/app/models/ChapterAssuntoComentario';
import { ComentarioService } from 'src/app/services/comentario.service';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

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
  idUsuarioLogado : string;
  currentPage: number = 1;
  itemsPerPage: number = 3;
  startIndex: number = (this.currentPage - 1) * this.itemsPerPage;
  endIndex: number = this.currentPage * this.itemsPerPage;  


  constructor(
    private fb:FormBuilder,
    private route: ActivatedRoute, 
    private comentarioService: ComentarioService, private authGuardService: AuthGuardService ) { }

  ngOnInit() {

    this.idUsuarioLogado = this.authGuardService.getIdUsuarioLogado();
    let id = this.route.snapshot.params["id"]
    this.comentarioService.FiltrarChapterAssuntoComentarioPorId(id).subscribe((data)=>{
      this.comentario.chapterAssuntoId= id;
      this.comentarios = data;
    });

    this.form = this.fb.group({
      comentario: [null,[Validators.required,Validators.minLength(5)]]
    });
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();
    }
  }

  nextPage() {
    const totalPages = Math.ceil(this.comentarios.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updatePage();
    }
  }

  updatePage() {
    this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.endIndex = Math.min(this.currentPage * this.itemsPerPage, this.comentarios.length);
  }  

  onSubmit() {

    var date;
    date = new Date();
    date = date.getUTCFullYear() + '-' +
        ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
        ('00' + date.getUTCDate()).slice(-2) + ' ' + 
        ('00' + date.getUTCHours()).slice(-2) + ':' + 
        ('00' + date.getUTCMinutes()).slice(-2) + ':' + 
        ('00' + date.getUTCSeconds()).slice(-2);
    


    this.comentario.texto = this.form.value.comentario;
    this.comentario.data = date;
    this.comentario.usuarioId = this.idUsuarioLogado;
//    this.comentarioService.NovoChapterAssuntoComentario(this.comentario)
    debugger;
    this.comentarioService.NovoChapterAssuntoComentario(this.comentario).subscribe((data)=>{

    });
    window.location.reload()
  }

  onCancel() {
    console.log("onCancel");
    this.form.reset();
  }  

}