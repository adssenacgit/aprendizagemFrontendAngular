import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Bibliografia } from 'src/app/models/Bibliografia';
import { Competencia } from 'src/app/models/Competencia';
import { CompetenciaIndicador } from 'src/app/models/CompetenciaIndicador';
import { Grupo } from 'src/app/models/Grupo';
import { PlanejamentoUC } from 'src/app/models/PlanejamentoUC';
import { BibliografiaService } from 'src/app/services/bibliografia.service';
import { CompetenciaIndicadorService } from 'src/app/services/competencia-indicador.service';
import { CompetenciaService } from 'src/app/services/competencia.service';
import { ObjetoAprendizagemService } from 'src/app/services/objetoaprendizagem.service';

@Component({
  selector: 'app-professor-info-grupo',
  templateUrl: './professor-info-grupo.component.html',
  styleUrls: ['./professor-info-grupo.component.css']
})
export class ProfessorInfoGrupoComponent implements OnInit {

  @Input() grupo: Grupo;
  @Input() planejamentoUc :PlanejamentoUC;

  competencias: Competencia[];
  bibliografia: Bibliografia[];
  competenciaIndicadores: CompetenciaIndicador[];
  isLoading: boolean = true;

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
    if(this.isLoading){
      this.competenciaService.filterByUnidadeCurricularId(this.grupo.unidadeCurricularId).subscribe(
        (competencias: Competencia[]) => {
          this.competencias = competencias;
        }
      );
      this.obterCompetenciaIndicadores();
    }
  }

  public obterBibliografia() {
    this.bibliografiaService.FiltrarbibliografiaByUnidadeCurricularId(this.grupo.unidadeCurricularId).subscribe(
      (response: Bibliografia[]) => {
        this.bibliografia = response;
      }
    );
  }

  public obterCompetenciaIndicadores() {
    this.competenciaIndicadorService.FiltrarCompetenciaIndicadoresByUnidadeCurricularId(this.grupo.unidadeCurricularId)
      .subscribe({
        next: (res => {
          this.competenciaIndicadores = res
          this.obterObjetosPorCompetenciaIndicador();
        }),
        complete: (() => this.isLoading = false)
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
  }

}
