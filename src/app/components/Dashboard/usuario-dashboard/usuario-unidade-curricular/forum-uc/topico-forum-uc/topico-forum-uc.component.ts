import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, QueryList, Renderer2, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChapterAssunto } from 'src/app/models/ChapterAssunto';
import { ChapterAssuntoComentario } from 'src/app/models/ChapterAssuntoComentario';
import { Curtida } from 'src/app/models/Curtida';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { ChapterAssuntoService } from 'src/app/services/chapter-assunto.service';
import { ComentarioService } from 'src/app/services/comentario.service';
import { CurtidaService } from 'src/app/services/curtida.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-topico-forum-uc',
  templateUrl: './topico-forum-uc.component.html',
  styleUrls: ['./topico-forum-uc.component.css']
})
export class TopicoForumUcComponent implements OnInit {

  textoSanitizado: string;
  form: FormGroup;
  comentario: ChapterAssuntoComentario = new ChapterAssuntoComentario();
  comentarios: ChapterAssuntoComentario[] = [];
  chapterAssuntos: ChapterAssunto[];
  pergunta: ChapterAssunto;
  idUsuarioLogado: string;
  currentPage: number = 1;
  itemsPerPage: number = 8;
  startIndex: number = (this.currentPage - 1) * this.itemsPerPage;
  endIndex: number = this.currentPage * this.itemsPerPage;
  totalPages: number[];
  descriptions: string[] = [];
  curtida: Curtida = new Curtida();
  curtidas: Curtida[] = [];
  comentarioCurtido: boolean;
  comentariosFilhos: ChapterAssuntoComentario[] = [];
  modalResposta: boolean = false;
  respostaFilhoForm: FormGroup;
  comentarioPaiIdSelecionado: number;


  @ViewChildren('comentario') comentariosDom: QueryList<ElementRef>;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private comentarioService: ComentarioService,
    private authGuardService: AuthGuardService,
    private chapterAssuntoService: ChapterAssuntoService,
    private curtidaService: CurtidaService,
    private usuarioService: UsuariosService,
    private el: ElementRef,
    private renderer: Renderer2,
    private location: Location

  ) {}

  ngOnInit() {
    this.idUsuarioLogado = this.authGuardService.getIdUsuarioLogado();
    let perguntaId = this.route.snapshot.params['id'];

    this.form = this.fb.group({
      comentario: [null, [Validators.required, Validators.minLength(5)]],
    });

    this.respostaFilhoForm = this.fb.group({
      comentario: [null, [Validators.required, Validators.minLength(5)]],
      idComentario: [null],
    });


    this.chapterAssuntoService.ObterChapterAssuntoByIdJava(perguntaId).subscribe((data) => {
      this.pergunta = data;
      this.calculateTotalPages(false);
      console.log(this.pergunta);
    });

    this.comentarioService.obterChapterAssuntoComentariosPorChapterAssuntoIdJava(perguntaId).subscribe((data) => {
      this.comentarios = data;
      console.log(this.comentarios);
    });





    this.comentarioCurtido = this.checarCurtida(this.curtidas, this.idUsuarioLogado);
  }

  sanitizeHTML(input: string): string {
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
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
    this.endIndex = Math.min(
      this.currentPage * this.itemsPerPage,
      this.comentarios.length
    );
  }

  irParaPagina(i: number) {
    this.currentPage = i;
    this.updatePage();
  }

  calculateTotalPages(filtrado: boolean) {
    if (!filtrado) {
      const itemsPerPage = this.itemsPerPage;
      if (itemsPerPage > 0) {
        const totalItems = this.comentarios.length;
        const pageCount = Math.ceil(totalItems / itemsPerPage);

        this.totalPages = Array.from(
          { length: pageCount },
          (_, index) => index + 1
        );
      } else {
        console.error(
          'O número de itens por página não está definido ou é inválido.'
        );
      }
    } else {
      const itemsPerPage = this.itemsPerPage;
      if (itemsPerPage > 0) {
        const totalItems = this.comentarios.length;
        const pageCount = Math.ceil(totalItems / itemsPerPage);

        this.totalPages = Array.from(
          { length: pageCount },
          (_, index) => index + 1
        );
      } else {
        console.error(
          'O número de itens por página não está definido ou é inválido.'
        );
      }
    }
  }

  onDelete() {}

  onSubmit() {
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

    this.comentario.texto = this.form.value.comentario;
    // this.textoSanitizado = this.sanitizeHTML(this.comentario.texto.toString());
    this.comentario.data = date;
    this.comentario.chapterAssuntoId = this.pergunta.id;
    this.comentario.usuarioId = this.idUsuarioLogado;


    console.log(this.comentario);
    this.comentarioService
      .novoChapterAssuntoComentario(this.comentario)
      .subscribe({
        next: () => {
          location.reload();
        },
      });
  }

  onCancel() {
    console.log('onCancel');
    this.form.reset();
    this.location.back();
  }
  limparFormulario() {
    this.form.reset();
    this.descriptions = [];
  }

  limparFormularioFilho() {
    this.respostaFilhoForm.reset();
    this.descriptions = [];
  }

  verificarCampos(): boolean {
    return this.form.valid;
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


  getPosterNameByComentarioId(id: number): string {
    let comentario = this.comentarios.find(comentario => comentario.id == id);
    return comentario!.usuario.nomeCompleto;
  }

  scrollToElement(id: number): void {
    const comentarioElement = this.comentariosDom.find(comentario => comentario.nativeElement.id === `comentario-${id}`);
    console.log(this.comentariosDom);
    console.log(comentarioElement);
    if (comentarioElement) {
      comentarioElement.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToEditor(id: string): void {
    const editorElement = this.el.nativeElement.querySelector(`#${id}`);
    if (editorElement) {
      editorElement.scrollIntoView({ behavior: 'instant', block: 'start' });
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
    this.comentario.chapterAssuntoId = this.pergunta.id;
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

  ordernarPorData(order: string) {
    if (order == 'decrescente') {
      this.comentarios.sort(
        (a, b) =>
          new Date(b.data).getDate() -
          new Date(a.data).getDate()
      );
    } else if (order == 'crescente') {
      this.comentarios.sort(
        (a, b) =>
          new Date(a.data).getDate() -
          new Date(b.data).getDate()
      );
    }
  }

  ordenarPorMaisCurtidos() {
      this.comentarios.sort(
        (a, b) =>
          b.curtidas.length -
          a.curtidas.length
      );
  }

  ordernarPorMaisRespondidos() {
    const frequencia: { [id: number]: number } = {};
    this.comentarios.forEach((comentario) => {
      const paiId = comentario.paiId;
      if (paiId !== null) {
        frequencia[paiId] = (frequencia[paiId] || 0) + 1;
      }
    });
    this.comentarios.sort((a, b) => (frequencia[b.id] || 0) - (frequencia[a.id] || 0));
    console.log(this.comentarios);
  }

}
