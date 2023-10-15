import { PlanejamentoUC } from 'src/app/models/PlanejamentoUC';
import { Component, Input, OnInit } from '@angular/core';
import { Grupo } from 'src/app/models/Grupo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompetenciaService } from 'src/app/services/competencia.service';
import { BibliografiaService } from 'src/app/services/bibliografia.service';
import { Bibliografia } from 'src/app/models/Bibliografia';
import { Competencia } from 'src/app/models/Competencia';
import { CompetenciaIndicador } from 'src/app/models/CompetenciaIndicador';
import { CompetenciaIndicadorService } from 'src/app/services/competencia-indicador.service';
import { ObjetoAprendizagemService } from 'src/app/services/objetoaprendizagem.service';

@Component({
  selector: 'app-card-info-grupo',
  templateUrl: './card-info-grupo.component.html',
  styleUrls: ['./card-info-grupo.component.css']
})
export class CardInfoGrupoComponent implements OnInit {


  @Input() grupo: Grupo;
  @Input() planejamentoUc :PlanejamentoUC;

  competencias: Competencia[];
  bibliografias: Bibliografia[];
  competenciaIndicadores: CompetenciaIndicador[];

  constructor(
    private _snackBar: MatSnackBar,
    private competenciaService: CompetenciaService,
    private bibliografiaService: BibliografiaService,
    private competenciaIndicadorService: CompetenciaIndicadorService,
    private objetoAprendizagemService: ObjetoAprendizagemService
    ) { }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  public obterCompetencias() {
    this.competenciaService.filterByUnidadeCurricularId(this.grupo.unidadeCurricularId).subscribe(
      (competencias: Competencia[]) => {
        this.competencias = competencias;
      }
    );
    this.obterCompetenciaIndicadores();
  }

  public obterBibliografia() {
    this.bibliografiaService.FiltrarbibliografiaByUnidadeCurricularId(this.grupo.unidadeCurricularId).subscribe(
      (bibliografias: Bibliografia[]) => {
        this.bibliografias = bibliografias;
        console.log(this.bibliografias)
      }
    );
  }

  public obterCompetenciaIndicadores() {
    this.competenciaIndicadorService.FiltrarCompetenciaIndicadoresByUnidadeCurricularId(this.grupo.unidadeCurricularId)
      .subscribe({
        next: (res => {
          this.competenciaIndicadores = res
          this.obterObjetosPorCompetenciaIndicador();
        })
      });
  }

  public obterObjetosPorCompetenciaIndicador() {
    this.competenciaIndicadores.forEach(
      (competenciaIndicador => {
        this.objetoAprendizagemService.FiltrarObjetoAprendizagemPorIndicadorCompetenciaId(competenciaIndicador.id)
          .subscribe({
            next: (res => {
              competenciaIndicador.objetosAprendizagem = res;
            })
          })
      })
    )
    console.log(this.competenciaIndicadores)
  }
}
