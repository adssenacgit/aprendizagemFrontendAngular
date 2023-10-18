import { Component, OnInit } from '@angular/core';
import { stringToKeyValue } from '@angular/flex-layout/extended/style/style-transforms';
import { ActivatedRoute } from '@angular/router';
import { ChapterAssunto } from 'src/app/models/ChapterAssunto';
import { ChapterAssuntoService } from 'src/app/services/chapter-assunto.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/models/Usuario';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

@Component({
  selector: 'app-apoio-duvidas',
  templateUrl: './apoio-duvidas.component.html',
  styleUrls: ['./apoio-duvidas.component.css'],
})
export class ApoioDuvidasComponent implements OnInit {
  busca: string;
  chapterAssuntos: ChapterAssunto[];
  chapterAssuntosTodos: ChapterAssunto[];
  currentPage: number = 1;
  itemsPerPage: number = 8;
  startIndex: number = (this.currentPage - 1) * this.itemsPerPage;
  endIndex: number = this.currentPage * this.itemsPerPage;
  totalPages: number[];
  usuario: Usuario;
  idUsuarioLogado: string;

  constructor(
    private _route: ActivatedRoute,
    private chapterAssuntoService: ChapterAssuntoService,
    private usuarioService: UsuariosService,
    private authGuardService: AuthGuardService
  ) {}

  ngOnInit(): void {
    this.chapterAssuntoService.ObterTodos().subscribe((data) => {
      this.chapterAssuntosTodos = data;
      this.chapterAssuntos = data;
      this.calculateTotalPages(false);
    });

    this.idUsuarioLogado = this.authGuardService.getIdUsuarioLogado();

    this.usuarioService
      .ObterUsuarioPorId(this.idUsuarioLogado)
      .subscribe((resultado) => {
        this.usuario = resultado;
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

  filtraPorTitulo(busca: string) {
    this.chapterAssuntos = this.chapterAssuntosTodos.filter(
      (value) =>
        value.titulo.toLowerCase().includes(busca) ||
        value.descricao.toLowerCase().includes(busca)
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
