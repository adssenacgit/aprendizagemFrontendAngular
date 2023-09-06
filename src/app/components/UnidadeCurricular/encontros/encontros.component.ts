import { SituacaoAprendizagemService } from './../../../services/situacaoaprendizagem.service';
import { SituacaoAprendizagem } from './../../../models/SituacaoAprendizagem';
import { EstudantesService } from 'src/app/services/estudante.service';
import { BadgeService } from './../../../services/badge.service';
import { PlanejamentoUcService } from './../../../services/planejamento-uc.service';
import { BibliografiaService } from './../../../services/bibliografia.service';
import { GrupoService } from './../../../services/grupo.service';
import { CompetenciaService } from './../../../services/competencia.service';
import { UnidadeCurricularService } from './../../../services/unidade-curricular.service';
import { AuthGuardService } from './../../../services/auth-guard.service';
import { Component, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
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
import { DomSanitizer } from '@angular/platform-browser';
import { Estudante } from 'src/app/models/Estudante';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgModule } from '@angular/core';
import { ObjetoAprendizagemService } from 'src/app/services/objetoaprendizagem.service';
import { ObjetoAprendizagem } from 'src/app/models/ObjetoAprendizagem';
import { EncontroStatus } from 'src/app/models/EncontroStatus';
// import { AccordionModule } from 'ngx-bootstrap/accordion';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-encontros',
  templateUrl: './encontros.component.html',
  styleUrls: ['./encontros.component.css'],
  encapsulation: ViewEncapsulation.None
})

// @NgModule({
//   imports: [BrowserAnimationsModule,
//     AccordionModule.forRoot(),]
// })

export class EncontrosComponent implements OnInit {

  idEstudanteUsuarioLogado: number;
  grupoId: number;
  loading: boolean = true;

  encontros: Encontro[] = [];

  leftNavDisabled = false;
  rightNavDisabled = false;

  grupo: Grupo = new Grupo();
  unidadeCurricular: UnidadeCurricular = new UnidadeCurricular();
  competencias: Competencia[] = [];
  competenciaIndicadores: CompetenciaIndicador[] = [];
  bibliografias: Bibliografia[] = [];
  participantes: Estudante[] = [];
  situacoesAprendizagem: SituacaoAprendizagem[] = [];
  situacaoAprendizagem: SituacaoAprendizagem;
  objetosAprendizagem: ObjetoAprendizagem[] = [];
  planejamentoUC: PlanejamentoUC = new PlanejamentoUC();
  badges: Badge[] = [];
  encontroCursados : number[] = [];

  statusAtividades: number = 5;

  @ViewChild('nav', { read: DragScrollComponent }) ds: DragScrollComponent;

  constructor(
    private route: ActivatedRoute,
    private encontroService: EncontroService,
    private grupoService: GrupoService,
    private unidadeCurricularService: UnidadeCurricularService,
    private competenciaService: CompetenciaService,
    private competenciaIndicadorService: CompetenciaIndicadorService,
    private bibliografiaService: BibliografiaService,
    private planejamentoUcService: PlanejamentoUcService,
    private badgeService: BadgeService,
    private estudantesService: EstudantesService,
    private situacaoAprendizagemService: SituacaoAprendizagemService,
    private objetoAprendizagemService: ObjetoAprendizagemService,
    private authGuardService: AuthGuardService,
    private sanitizer: DomSanitizer,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.idEstudanteUsuarioLogado = this.authGuardService.getIdEstudanteUsuarioLogado();
    this.grupoId = this.route.snapshot.params['id'];
    //this.grupoId = 7;
    this.ObterEncontros();
    //this.ds.moveTo(8);
    this.ObterDetalhesUC();
    this.ObterEncontrosCursados();

  }

  getImage(baseImage: string): any {

    let objectURL = 'data:image/png;base64,' + atob(baseImage);
    return objectURL;
  }

  ObterEncontrosCursados = () =>{
    // this.encontroStatus = this.encontros.map((a) => a.encontroStatus.statusCursada);
    this.encontros.forEach(encontro => {
      this.encontroCursados.push(encontro.encontroStatus.statusCursada);
      
    })

    console.log(this.encontros)
  }

  ObterEncontros = () => {
    
    this.encontroService.ObterEncontroPorGrupoId(this.grupoId, this.idEstudanteUsuarioLogado).subscribe(resultado => {
      this.encontros = resultado;
      this.encontros.forEach(encontro => {
        this.situacaoAprendizagemService.FiltrarSituacoesAprendizagemPorEncontroId(encontro.id).subscribe(situacao => 
          { encontro.situacaoAprendizagem = situacao;
            
                        this.loading = false}
        )
      });
      // this.ObterSituacoesAprendizagem(this.encontros[0].id, 0);

      this.loading = false;
    });
  };


  ObterDetalhesUC = () => {
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
        }
      );

      this.estudantesService.ObterEstudanteByGrupoId(this.grupo.id).subscribe(
        (participantes: Estudante[]) => {
          this.participantes = participantes;
        }
      );

      this.situacaoAprendizagemService.ObterSituacaoAprendizagem().subscribe(
        (situacoesAprendizagem: SituacaoAprendizagem[]) => {
          this.situacoesAprendizagem = situacoesAprendizagem;
        }
      )

      this.loading = false;
    });
  }

  ObterSituacoesAprendizagem = (idEncontro: number, i: number) => {

    this.objetosAprendizagem = [];

    for (var j = 0; j < this.encontros.length; j = j + 1) {
      this.encontros[j].selecionado = 0;
    }

    this.encontros[i].selecionado = 1;

    this.loading = true;
    this.situacaoAprendizagemService.FiltrarSituacoesAprendizagemPorEncontroId(idEncontro).subscribe(resultado => {
      this.situacoesAprendizagem = resultado;
      this.loading = false;
    });
  };

  ObterObjetosAprendizagem = (idSituacaoAprendizagem: number, i: number) => {

    for (var j = 0; j < this.situacoesAprendizagem.length; j = j + 1) {
      this.situacoesAprendizagem[j].selecionado = 0;
    }

    this.situacoesAprendizagem[i].selecionado = 1;

    this.loading = true;
    this.objetoAprendizagemService.FiltrarObjetoAprendizagemPorSituacaoAprendizagemId(idSituacaoAprendizagem).subscribe(resultado => {
      this.objetosAprendizagem = resultado;
      this.loading = false;
    });
  };

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

  AbrirDialog(id: any, descricaoCompetencia: any): void {
    this.dialog.open(DialogIndicadoresComponent, {
      data: {
        id: id,
        descricao: descricaoCompetencia,
      }
    });
  }

}

@Component({
  selector: 'app-dialog-indicadores',
  templateUrl: './dialog-indicadores.html'
})

export class DialogIndicadoresComponent {

  competenciaIndicadores: CompetenciaIndicador[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public dados: any,
    private competenciaIndicadorService: CompetenciaIndicadorService
  ) { }

  ngOnInit(): void {
    this.competenciaIndicadorService.FiltrarCompetenciaIndicadoresByUnidadeCurricularId(this.dados.id).subscribe(resultado => {
      this.competenciaIndicadores = resultado;
    });
  }

}