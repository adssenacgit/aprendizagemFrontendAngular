import { Component, Input, OnInit } from '@angular/core';
import { Encontro } from 'src/app/models/Encontro';

@Component({
  selector: 'app-professor-encontros',
  templateUrl: './professor-encontros.component.html',
  styleUrls: ['./professor-encontros.component.css']
})
export class ProfessorEncontrosComponent implements OnInit {

  @Input()
  encontros: Encontro[]

  constructor() { }

  ngOnInit(): void {
  }

  obterAcompanhamento(encontro: Encontro){
    console.log('obterAcompanhamento')

  }
}
