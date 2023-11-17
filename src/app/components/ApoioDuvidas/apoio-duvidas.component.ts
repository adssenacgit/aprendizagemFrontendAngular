import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { stringToKeyValue } from '@angular/flex-layout/extended/style/style-transforms';
import { ActivatedRoute } from '@angular/router';
import { ChapterAssunto } from 'src/app/models/ChapterAssunto';
import { ChapterAssuntoService } from 'src/app/services/chapter-assunto.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/models/Usuario';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { ChapterService } from 'src/app/services/chapter.service';
import { ComentarioService } from 'src/app/services/comentario.service';
import { ChapterTag } from 'src/app/models/ChapterTag';
import { Chapter } from 'src/app/models/Chapter';
import { ChapterTagService } from 'src/app/services/chapter-tag.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-apoio-duvidas',
  templateUrl: './apoio-duvidas.component.html',
  styleUrls: ['./apoio-duvidas.component.css'],
})
export class ApoioDuvidasComponent implements OnInit {
  busca: string;
  chapterAssuntos: ChapterAssunto[];
  chapterAssuntosTodos: ChapterAssunto[];
  chapterTodos: Chapter[];
  chapterTodosNomes: string[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 8;
  startIndex: number = (this.currentPage - 1) * this.itemsPerPage;
  endIndex: number = this.currentPage * this.itemsPerPage;
  totalPages: number[];
  usuario: Usuario;
  idUsuarioLogado: string;
  chapterTagTodos: ChapterTag[];
  rankComentarios: { usuario: [foto: string, nome: string]; count: number }[] =
    [];
  loading = true;

  constructor(
    private _route: ActivatedRoute,
    private chapterAssuntoService: ChapterAssuntoService,
    private usuarioService: UsuariosService,
    private authGuardService: AuthGuardService,
    private chapterService: ChapterService,
    private chapterTagService: ChapterTagService,
    private comentarioService: ComentarioService,
    private cdr: ChangeDetectorRef
  ) {
    interval(1000).subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  ngOnInit(): void {
    this.chapterAssuntoService.ObterTodosJava().subscribe((data) => {
      console.log(data)
      this.chapterAssuntosTodos = data;
      this.chapterAssuntos = data;
      this.calculateTotalPages(false);
    });

    this.todosChapter();

    this.idUsuarioLogado = this.authGuardService.getIdUsuarioLogado();

    this.chapterTagService
      .ObterTodos()
      .subscribe((data) => (this.chapterTagTodos = data));

    this.comentarioService.ObterTodos().subscribe((data) => {
      const frequencyMap = new Map();
      data.forEach((item) => {
        const usuarioKey = JSON.stringify([
          item.usuario.foto,
          item.usuario.nomeCompleto,
        ]);
        frequencyMap.set(usuarioKey, (frequencyMap.get(usuarioKey) || 0) + 1);
      });
      this.rankComentarios = Array.from(frequencyMap.entries()).map(
        ([usuario, count]) => ({ usuario, count })
      );

      this.rankComentarios = Array.from(frequencyMap.entries()).map(
        ([usuarioKey, count]) => ({
          usuario: JSON.parse(usuarioKey),
          count,
        })
      );

      this.rankComentarios.sort((a, b) => b.count - a.count);
      this.rankComentarios = this.rankComentarios.slice(0, 3);
    });

    this.usuarioService
      .ObterUsuarioPorId(this.idUsuarioLogado)
      .subscribe((resultado) => {
        this.usuario = resultado;
      });
  }

  todosChapter() {
    this.chapterService.ObterTodos().subscribe((data) => {
      this.chapterTodos = data;
      this.chapterTodos.forEach((val) => this.chapterTodosNomes.push(val.nome));
      console.log(this.chapterTodosNomes);
    });
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();
    }
  }

  nextPage() {
    const totalPages = Math.ceil(
      this.chapterAssuntos.length / this.itemsPerPage
    );
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updatePage();
    }
  }

  updatePage() {
    this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.endIndex = Math.min(
      this.currentPage * this.itemsPerPage,
      this.chapterAssuntos.length
    );
  }

  ordernarPorData(order: string) {
    if (order == 'decrescente') {
      this.chapterAssuntos.sort(
        (a, b) =>
          new Date(b.dataCadastro).getDate() -
          new Date(a.dataCadastro).getDate()
      );
    } else if (order == 'crescente') {
      this.chapterAssuntos.sort(
        (a, b) =>
          new Date(a.dataCadastro).getDate() -
          new Date(b.dataCadastro).getDate()
      );
    }
  }

  ordernarPorResposta(order: string) {
    if (order == 'decrescente') {
      this.chapterAssuntos.sort(
        (a, b) => b.totalComentarios - a.totalComentarios
      );
    }
  }

  filtrarPorVerificacao() {
    this.chapterAssuntos = this.chapterAssuntosTodos.filter(
      (value) => value.verificacao != null
    );
  }

  filtraPorTitulo(busca: string) {
    this.chapterAssuntos = this.chapterAssuntosTodos.filter(
      (value) =>
        value.titulo.toLowerCase().includes(busca) ||
        value.descricao.toLowerCase().includes(busca)
    );
    this.currentPage = 1;
    this.calculateTotalPages(true);
  }

  filtraPorChapter(busca: string) {
    this.chapterAssuntos = this.chapterAssuntosTodos.filter((value) =>
      value.chapter.nome.toLowerCase().includes(busca.toLowerCase())
    );
    this.currentPage = 1;
    this.calculateTotalPages(true);
  }

  irParaPagina(i: number) {
    this.currentPage = i;
    this.updatePage();
  }

  calculateTotalPages(filtrado: boolean) {
    if (!filtrado) {
      const itemsPerPage = this.itemsPerPage;
      if (itemsPerPage > 0) {
        const totalItems = this.chapterAssuntosTodos.length;
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
        const totalItems = this.chapterAssuntos.length;
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
}
