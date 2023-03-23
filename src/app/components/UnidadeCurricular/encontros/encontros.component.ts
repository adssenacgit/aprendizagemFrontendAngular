import { BadgeService } from './../../../services/badge.service';
import { PlanejamentoUcService } from './../../../services/planejamento-uc.service';
import { BibliografiaService } from './../../../services/bibliografia.service';
import { GrupoService } from './../../../services/grupo.service';
import { CompetenciaService } from './../../../services/competencia.service';
import { UnidadeCurricularService } from './../../../services/unidade-curricular.service';
import { AuthGuardService } from './../../../services/auth-guard.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Encontro } from 'src/app/models/Encontro';
import { EncontroService } from 'src/app/services/encontro.service';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { UnidadeCurricular } from 'src/app/models/UnidadeCurricular';
import { Competencia } from 'src/app/models/Competencia';
import { CompetenciaIndicador } from 'src/app/models/CompetenciaIndicador';
import { CompetenciaIndicadorService } from 'src/app/services/competencia-indicador.service';
import { Grupo } from 'src/app/models/Grupo';
import { Bibliografia } from 'src/app/models/Bibliografia';
import { PlanejamentoUC } from 'src/app/models/PlanejamentoUC';
import { Badge } from 'src/app/models/Badge';

@Component({
  selector: 'app-encontros',
  templateUrl: './encontros.component.html',
  styleUrls: ['./encontros.component.css'],
})
export class EncontrosComponent implements OnInit {

  idUsuarioLogado : string;
  grupoId: number;
  loading: boolean = true;

  encontros: Encontro[];

  leftNavDisabled = false;
  rightNavDisabled = false;

  grupo: Grupo= new Grupo();
  unidadeCurricular: UnidadeCurricular = new UnidadeCurricular();
  competencias: Competencia[]=[];
  competenciaIndicadores: CompetenciaIndicador[]=[];
  bibliografias: Bibliografia[]=[];
  planejamentoUC: PlanejamentoUC = new PlanejamentoUC();
  badges: Badge[]=[];

  statusAtividades: number = 5;

  @ViewChild('nav', {read: DragScrollComponent}) ds: DragScrollComponent;

  constructor(
    private route : ActivatedRoute,
    private encontroService: EncontroService,
    private grupoService: GrupoService,
    private unidadeCurricularService: UnidadeCurricularService,
    private competenciaService: CompetenciaService,
    private competenciaIndicadorService: CompetenciaIndicadorService,
    private bibliografiaService: BibliografiaService,
    private planejamentoUcService: PlanejamentoUcService,
    private badgeService: BadgeService,
    private authGuardService: AuthGuardService
  ) {  }

  ngOnInit(): void {
    this.idUsuarioLogado = this.authGuardService.getIdUsuarioLogado();
    //this.grupoId = this.route.snapshot.params['id'];
    this.grupoId = 7;
    this.ObterEncontros();
    //this.ds.moveTo(8);
    this.ObterDetalhesUC();
  }

  ObterEncontros = () => {
    this.encontroService.ObterEncontroPorGrupoId(this.grupoId, this.idUsuarioLogado).subscribe(resultado => {
        this.encontros = resultado;
        this.loading = false;
      });
  };

  ObterDetalhesUC = ()=> {
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

      this.competenciaIndicadorService.FiltrarCompetenciaIndicadoresByUnidadeCurricularId(this.grupo.unidadeCurricularId).subscribe(
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

      this.badgeService.ObterBadgesPeloGrupoId(this.grupo.id).subscribe(
        (badge: Badge[]) => {
          this.badges = badge;
          console.log(badge)
        }
      );

      this.loading = false;
    });
  }


  //Comandos do scroll de encontros
  moveLeft() {
    this.ds.moveLeft();
  }
  moveRight() {
    this.ds.moveRight();
  }
  moveTo(index: number) {
    this.ds.moveTo(index);
  }

}