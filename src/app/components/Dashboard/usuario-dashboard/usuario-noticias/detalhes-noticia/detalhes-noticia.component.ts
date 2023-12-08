import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Chapter } from 'src/app/models/Chapter';
import { ChapterAssunto } from 'src/app/models/ChapterAssunto';
import { ChapterAssuntoComentario } from 'src/app/models/ChapterAssuntoComentario';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { ChapterAssuntoService } from 'src/app/services/chapter-assunto.service';
import { ComentarioService } from 'src/app/services/comentario.service';

@Component({
  selector: 'app-detalhes-noticia',
  templateUrl: './detalhes-noticia.component.html',
  styleUrls: ['./detalhes-noticia.component.css']
})
export class DetalhesNoticiaComponent {

  noticia: ChapterAssunto;
  noticiaId: number;
  comentarios: ChapterAssuntoComentario[] = [];
  form: FormGroup;
  textoSanitizado: string;
  comentario: ChapterAssuntoComentario = new ChapterAssuntoComentario();
  idUsuarioLogado: string;
  descriptions: string[] = [];


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.noticiaId = params['id'];
      this.chapterAssuntoService.ObterChapterAssuntoByIdJava(this.noticiaId).subscribe((data) => {
        this.noticia = data;
        console.log(data);
        this.processarDescricao();
      });
    });
    this.form = this.fb.group({
      comentario: [null, [Validators.required, Validators.minLength(5)]],
    });
    this.chapterAssuntoComentarioService.obterChapterAssuntoComentariosPorChapterAssuntoIdJava(this.noticiaId).subscribe((data) => {
      this.comentarios = data;
      console.log(data);
    });
    this.idUsuarioLogado = this.authGuardService.getIdUsuarioLogado();
  }

  constructor(
    private route: ActivatedRoute,
    private chapterAssuntoService: ChapterAssuntoService,
    private chapterAssuntoComentarioService: ComentarioService,
    private fb: FormBuilder,
    private authGuardService: AuthGuardService,
    private comentarioService: ComentarioService
    ) {}

  private processarDescricao(): void {
    const descricaoHtml = this.noticia.descricao;
    const descricaoComBr = this.adicionarBrAposP(descricaoHtml);
    this.noticia.descricao = descricaoComBr;
  }

  private adicionarBrAposP(descricao: string): string {
    const descricaoComBr = descricao.replace(/<\/p>/g, '</p><br>');
    return descricaoComBr;
  }

  sanitizeHTML(input: string): string {
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  onSubmit() {
    var date;
    date = new Date();
    this.comentario.texto = this.form.value.comentario;
    this.comentario.data = date;
    this.comentario.chapterAssuntoId = this.noticia.id;
    this.comentario.usuarioId = this.idUsuarioLogado;
    console.log(this.comentario);
    this.comentarioService.novoChapterAssuntoComentarioJava(this.comentario).subscribe({next: () =>
    location.reload()}
    );
  }

  limparFormulario() {
    this.form.reset();
    this.descriptions = [];
  }

}
