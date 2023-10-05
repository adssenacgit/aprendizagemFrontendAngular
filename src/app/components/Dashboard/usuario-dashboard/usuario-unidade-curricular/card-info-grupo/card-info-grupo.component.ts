import { PlanejamentoUC } from 'src/app/models/PlanejamentoUC';
import { Component, Input, OnInit } from '@angular/core';
import { Grupo } from 'src/app/models/Grupo';

@Component({
  selector: 'app-card-info-grupo',
  templateUrl: './card-info-grupo.component.html',
  styleUrls: ['./card-info-grupo.component.css']
})
export class CardInfoGrupoComponent implements OnInit {

  @Input() grupo: Grupo;
  @Input() planejamentoUc :PlanejamentoUC;

  constructor() { }

  ngOnInit(): void {
  }

}
