import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChapterAssuntoComentario } from 'src/app/models/ChapterAssuntoComentario';
import { ComentarioService } from 'src/app/services/comentario.service';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChapterAssunto } from 'src/app/models/ChapterAssunto';
import { ChapterAssuntoService } from 'src/app/services/chapter-assunto.service';
@Component({
  selector: 'app-comentarios',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css'],
})
export class ComentarioComponent implements OnInit {
  textoSanitizado: string;
  form: FormGroup;
  comentario: ChapterAssuntoComentario = new ChapterAssuntoComentario();
  comentarios: ChapterAssuntoComentario[] = [];
  chapterAssuntos: ChapterAssunto[];
  pergunta: ChapterAssunto;
  idUsuarioLogado: string;
  currentPage: number = 1;
  itemsPerPage: number = 4;
  startIndex: number = (this.currentPage - 1) * this.itemsPerPage;
  endIndex: number = this.currentPage * this.itemsPerPage;
  totalPages: number[];
  descriptions: string[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private comentarioService: ComentarioService,
    private authGuardService: AuthGuardService,
    private chapterAssuntoService: ChapterAssuntoService
  ) {}

  ngOnInit() {
    this.idUsuarioLogado = this.authGuardService.getIdUsuarioLogado();
    let id = this.route.snapshot.params['id'];
    this.comentarioService
      .FiltrarChapterAssuntoComentarioPorId(id)
      .subscribe((data) => {
        this.comentario.chapterAssuntoId = id;
        this.comentarios = data;
        this.calculateTotalPages(false);
      });

    this.chapterAssuntoService.ObterChapterAssuntoById(id).subscribe((data) => {
      this.pergunta = data;
    });

    this.form = this.fb.group({
      comentario: [null, [Validators.required, Validators.minLength(5)]],
    });
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
    date =
      date.getUTCFullYear() +
      '-' +
      ('00' + (date.getUTCMonth() + 1)).slice(-2) +
      '-' +
      ('00' + date.getUTCDate()).slice(-2) +
      ' ' +
      ('00' + date.getUTCHours()).slice(-2) +
      ':' +
      ('00' + date.getUTCMinutes()).slice(-2) +
      ':' +
      ('00' + date.getUTCSeconds()).slice(-2);

    this.comentario.texto = this.form.value.comentario;
    this.textoSanitizado = this.sanitizeHTML(this.comentario.texto.toString());
    this.comentario.data = date;
    this.comentario.usuarioId = this.idUsuarioLogado;

    this.comentarioService
      .NovoChapterAssuntoComentario(this.comentario)
      .subscribe({
        next: () => {
          location.reload();
        },
      });
  }

  onCancel() {
    console.log('onCancel');
    this.form.reset();
  }
  limparFormulario() {
    this.form.reset();
    this.descriptions = [];
  }

  verificarCampos(): boolean {
    return this.form.valid;
  }
}
