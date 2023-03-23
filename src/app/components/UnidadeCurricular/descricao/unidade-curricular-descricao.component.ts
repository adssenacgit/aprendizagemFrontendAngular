import { Grupo } from './../../../models/Grupo';
import { GrupoService } from './../../../services/grupo.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { UnidadeCurricularService } from '../../../services/unidade-curricular.service';
import { UnidadeCurricular } from '../../../models/UnidadeCurricular';
import { CompetenciaService } from '../../../services/competencia.service';
import { Competencia } from 'src/app/models/Competencia';
import { CompetenciaIndicadorService } from 'src/app/services/competencia-indicador.service';
import { CompetenciaIndicador } from 'src/app/models/CompetenciaIndicador';
import { BibliografiaService } from 'src/app/services/bibliografia.service';
import { Bibliografia } from 'src/app/models/Bibliografia';
import { PlanejamentoUcService } from 'src/app/services/planejamento-uc.service';
import { PlanejamentoUC } from 'src/app/models/PlanejamentoUC';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-unidade-curricular-descricao',
  templateUrl: './unidade-curricular-descricao.component.html',
  styleUrls: ['./unidade-curricular-descricao.component.css']
})

export class UnidadeCurricularDescricaoComponent implements OnInit {

    unidadeCurricular: UnidadeCurricular = new UnidadeCurricular();
    competencias: Competencia[]=[];
    competenciaIndicadores: CompetenciaIndicador[]=[];
    bibliografias: Bibliografia[]=[];
    planejamentoUC: PlanejamentoUC = new PlanejamentoUC();
    grupo: Grupo;
    grupoId: number;

    loading: boolean = true;

    constructor(
      private router: Router, 
      private route : ActivatedRoute, 
      private unidadeCurricularService: UnidadeCurricularService, 
      private competenciaService: CompetenciaService, 
      private CompetenciaIndicadorService: CompetenciaIndicadorService, 
      private bibliografiaService: BibliografiaService, 
      private planejamentoUcService: PlanejamentoUcService,
      private grupoService: GrupoService
      ) { }

    ngOnInit(): void {

      this.grupoId = this.route.snapshot.params['id'];

      this.grupoService.ObterGrupoPeloId(this.grupoId).subscribe(resultado => {
        this.grupo = resultado;      

        this.unidadeCurricularService.ObterUnidadeCurricularPeloId(this.grupo.unidadeCurricularId).subscribe(
          (uc: UnidadeCurricular) => {
            this.unidadeCurricular = uc;
          },
        );

        this.competenciaService.filterByUnidadeCurricularId(this.grupo.unidadeCurricularId).subscribe(
          (competencias: Competencia[]) => {
            this.competencias = competencias;
          }
        );

        this.CompetenciaIndicadorService.FiltrarCompetenciaIndicadoresByUnidadeCurricularId(this.grupo.unidadeCurricularId).subscribe(
          (competenciaIndicadores: CompetenciaIndicador[]) => {
            this.competenciaIndicadores = competenciaIndicadores;
          }
        );
        
        this.bibliografiaService.FiltrarbibliografiaByUnidadeCurricularId(this.grupo.unidadeCurricularId).subscribe(
          (bibliografias: Bibliografia[]) => {
            this.bibliografias = bibliografias;
          }
        );

        this.planejamentoUcService.FiltrarPlanejamentoUCByGrupoId(this.grupo.id).subscribe(
          (planejamentoUC: PlanejamentoUC) => {
            this.planejamentoUC = planejamentoUC;
          }
        );

        this.loading = false;
      });        

    }
  }
