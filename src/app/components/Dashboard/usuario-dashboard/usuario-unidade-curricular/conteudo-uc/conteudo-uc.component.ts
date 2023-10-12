import { Component, Input, OnInit } from '@angular/core';
import { Encontro } from 'src/app/models/Encontro';
import { EncontroService } from 'src/app/services/encontro.service';

@Component({
  selector: 'app-conteudo-uc',
  templateUrl: './conteudo-uc.component.html',
  styleUrls: ['./conteudo-uc.component.css']
})
export class ConteudoUcComponent implements OnInit {
  encontros: Encontro[]

  constructor(
    private encontroService: EncontroService
  ) { }

  ngOnInit(): void {
    this.encontroService.currentData
      .subscribe({
        next: (encontros) => this.encontros = encontros
      })

  }

}
