import { Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChapterAssunto } from 'src/app/models/ChapterAssunto';
import { ChapterAssuntoComentario } from 'src/app/models/ChapterAssuntoComentario';
import { Curtida } from 'src/app/models/Curtida';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { ChapterAssuntoService } from 'src/app/services/chapter-assunto.service';
import { ComentarioService } from 'src/app/services/comentario.service';
import { CurtidaService } from 'src/app/services/curtida.service';

@Component({
  selector: 'app-card-comentario',
  templateUrl: './card-comentario.component.html',
  styleUrls: ['./card-comentario.component.css']
})
export class CardComentarioComponent implements OnInit {
  comentario: ChapterAssuntoComentario = new ChapterAssuntoComentario();
  comentarios: ChapterAssuntoComentario[] = [];
  curtidas: Curtida[] = [];
  curtida: Curtida = new Curtida();
  idUsuarioLogado: string;
  modalResposta: boolean = false;
  comentarioPaiIdSelecionado: number;
  respostaFilhoForm: FormGroup;
  descriptions: string[] = [];
  chapterAssunto: ChapterAssunto;
  comentarioCurtido: boolean;



  @ViewChildren('comentario') comentariosDom: QueryList<ElementRef>;
  constructor(
    private curtidaService: CurtidaService,
    private comentarioService: ComentarioService,
    private authGuardService: AuthGuardService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private chapterAssuntoService: ChapterAssuntoService
  ) { }

  ngOnInit(): void {
    this.idUsuarioLogado = this.authGuardService.getIdUsuarioLogado();
    let chapterAssuntoId = this.route.snapshot.params['id'];
    this.respostaFilhoForm = this.fb.group({
      comentario: [null, [Validators.required, Validators.minLength(5)]],
      idComentario: [null],
    });
    this.chapterAssuntoService.ObterChapterAssuntoByIdJava(chapterAssuntoId).subscribe((data) => {
      this.chapterAssunto = data;
      console.log(this.chapterAssunto);
    });
    this.comentarioService.obterChapterAssuntoComentariosPorChapterAssuntoIdJava(chapterAssuntoId).subscribe((data) => {
      this.comentarios = data;
      console.log(this.comentarios);
    });
    this.comentarioCurtido = this.checarCurtida(this.curtidas, this.idUsuarioLogado);
  }

  scrollToElement(id: number): void {
    const comentarioElement = this.comentariosDom.find(comentario => comentario.nativeElement.id === `comentario-${id}`);
    console.log(this.comentariosDom);
    console.log(comentarioElement);
    if (comentarioElement) {
      comentarioElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  getPosterNameByComentarioId(id: number): string {
    let comentario = this.comentarios.find(comentario => comentario.id == id);
    return comentario!.usuario.nomeCompleto;
  }

  checarCurtida(curtidas: Curtida[], idUsuario: string): boolean {
    return curtidas.some(curtida => curtida.usuario.id === idUsuario);
  }

  curtir(comentario: ChapterAssuntoComentario) {
    this.curtida.chapterAssuntoComentarioId = comentario.id;
    this.curtida.usuarioId = this.idUsuarioLogado;
    this.curtida.rank = 1;
    this.curtidaService.postCurtida(this.curtida).subscribe({
      next: () => {
        location.reload();
      },
    });

  }

  descurtir(comentario: ChapterAssuntoComentario) {
    const curtida = comentario.curtidas.find(curtida => curtida.usuario.id == this.idUsuarioLogado);
    if (curtida) {
      this.curtidaService.deleteCurtida(curtida.id).subscribe({
        next: () => {
          location.reload();
        },
      });
    }
  }

  showModalResposta(comentario: ChapterAssuntoComentario) {
    this.modalResposta = true;
    this.comentarioPaiIdSelecionado = comentario.id;
  }

  responder() {

    var date;
    date = new Date();
    // date =
    //   date.getUTCFullYear() +
    //   '-' +
    //   ('00' + (date.getUTCMonth() + 1)).slice(-2) +
    //   '-' +
    //   ('00' + date.getUTCDate()).slice(-2) +
    //   ' ' +
    //   ('00' + date.getUTCHours()).slice(-2) +
    //   ':' +
    //   ('00' + date.getUTCMinutes()).slice(-2) +
    //   ':' +
    //   ('00' + date.getUTCSeconds()).slice(-2);

    this.comentario.texto = this.respostaFilhoForm.get('comentario')!.value;
    // this.textoSanitizado = this.sanitizeHTML(this.comentario.texto.toString());
    this.comentario.data = date;
    this.comentario.chapterAssuntoId = this.chapterAssunto.id;
    this.comentario.usuarioId = this.idUsuarioLogado;
    this.comentario.paiId = this.comentarioPaiIdSelecionado;
    console.log(this.comentario);
    console.log(this.comentario.paiId);
    this.comentarioService
      .novoChapterAssuntoComentarioJava(this.comentario)
      .subscribe({
        next: () => {
          location.reload();
        },
      });
  }

  limparFormularioFilho() {
    this.respostaFilhoForm.reset();
    this.descriptions = [];
  }
}
