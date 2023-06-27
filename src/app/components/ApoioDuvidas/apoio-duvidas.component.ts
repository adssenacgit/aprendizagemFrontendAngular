import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChapterAssunto } from 'src/app/models/ChapterAssunto';
import { ChapterAssuntoService } from 'src/app/services/chapter-assunto.service';

@Component({
  selector: 'app-apoio-duvidas',
  templateUrl: './apoio-duvidas.component.html',
  styleUrls: ['./apoio-duvidas.component.css']
})
export class ApoioDuvidasComponent implements OnInit {
  
  chapterAssuntos: ChapterAssunto[];
  currentPage: number = 1;
  itemsPerPage: number = 4;
  startIndex: number = (this.currentPage - 1) * this.itemsPerPage;
  endIndex: number = this.currentPage * this.itemsPerPage;  

  constructor(
    private _route: ActivatedRoute,
    private chapterAssuntoService: ChapterAssuntoService
  ) {}

  ngOnInit(): void {
    this.chapterAssuntoService.ObterTodos().subscribe((data) => {
      this.chapterAssuntos = data;
    });
  }
  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePage();
    }
  }

  nextPage() {
    const totalPages = Math.ceil(this.chapterAssuntos.length / this.itemsPerPage);
    if (this.currentPage < totalPages) {
      this.currentPage++;
      this.updatePage();
    }
  }

  updatePage() {
    this.startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.endIndex = Math.min(this.currentPage * this.itemsPerPage, this.chapterAssuntos.length);
  }  
}
