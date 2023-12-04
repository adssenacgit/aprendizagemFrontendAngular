import { Component, OnInit } from '@angular/core';
import { Encontro } from 'src/app/models/Encontro';
import { EncontroService } from 'src/app/services/encontro.service';

@Component({
  selector: 'app-professor-conteudo-uc',
  templateUrl: './professor-conteudo-uc.component.html',
  styleUrls: ['./professor-conteudo-uc.component.css']
})
export class ProfessorConteudoUcComponent implements OnInit {

  encontros: Encontro[]

  constructor(
    private encontroService: EncontroService
  ) { }

  ngOnInit(): void {
    this.encontroService.currentData
      .subscribe({
        next: (response) => this.encontros = response
      })
  }

}
