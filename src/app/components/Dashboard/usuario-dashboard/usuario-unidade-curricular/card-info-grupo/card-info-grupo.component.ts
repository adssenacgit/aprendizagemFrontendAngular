import { PlanejamentoUC } from 'src/app/models/PlanejamentoUC';
import { Component, Input, OnInit } from '@angular/core';
import { Grupo } from 'src/app/models/Grupo';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-card-info-grupo',
  templateUrl: './card-info-grupo.component.html',
  styleUrls: ['./card-info-grupo.component.css']
})
export class CardInfoGrupoComponent implements OnInit {


  @Input() grupo: Grupo;
  @Input() planejamentoUc :PlanejamentoUC;

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

}
