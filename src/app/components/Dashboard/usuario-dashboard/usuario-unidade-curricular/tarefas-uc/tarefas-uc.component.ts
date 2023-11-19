import { Component, OnInit } from '@angular/core';
import { Encontro } from 'src/app/models/Encontro';
import { EncontroService } from 'src/app/services/encontro.service';

@Component({
  selector: 'app-tarefas-uc',
  templateUrl: './tarefas-uc.component.html',
  styleUrls: ['./tarefas-uc.component.css']
})
export class TarefasUcComponent implements OnInit {

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
