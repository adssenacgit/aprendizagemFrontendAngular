import { AuthGuardService } from './../../../../services/auth-guard.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PrimeIcons } from 'primeng/api';
import { catchError, delay, map, of, switchMap } from 'rxjs';
import { EncontroStatus } from 'src/app/models/EncontroStatus';
import { ErrorService } from 'src/app/shared/alerts/error-dialog/error-dialog.service';

import { Encontro } from 'src/app/models/Encontro';
import { EncontroService } from 'src/app/services/encontro.service';
import { AtividadeService } from 'src/app/services/atividade.service';
import { ObjetoAprendizagemService } from 'src/app/services/objetoaprendizagem.service';
import { SituacaoAprendizagemService } from 'src/app/services/situacaoaprendizagem.service';
import { StorageService } from 'src/app/shared/storage/storage.service';
import { Atividade } from 'src/app/models/Atividade';
import { SituacaoAprendizagem } from 'src/app/models/SituacaoAprendizagem';
import { ObjetoAprendizagem } from 'src/app/models/ObjetoAprendizagem';


@Component({
  selector: 'app-timeline-lista',
  templateUrl: './timeline-lista.component.html',
  styleUrls: ['./timeline-lista.component.css'],
})
export class TimelineListaComponent implements OnInit {

  idEstudanteUsuarioLogado : number;
  grupoId: number;
  loading: boolean = true;

  encontros: Encontro[] ;
  encontrosStatus: EncontroStatus[] = [];

  // situacaoAprendizagem: number = 3;
  // objetoAprendizagem: number = 3;
  // atividade: number = 2;
  // atividadeVerificacao: number = 1;
  // badgesObtidos: number = 1;

  // totalSituacaoAprendizagem: number = 1;
  // totalObjetoAprendizagem: number = 1;
  // totalAtividade: number = 1;
  // totalAtividadeVerificacao: number = 1;
  // totalBadgesObtidos: number = 1;
  //statusCursada: number = 0;

  PrimeIcons: PrimeIcons;

  displayDetalheEncontro : boolean;
  atividades: Atividade[];
  situacoesAprendizagem: SituacaoAprendizagem[];
  objetosAprendizagem: ObjetoAprendizagem;

  checked: boolean = true;

  constructor(
    private router: Router,
    private route : ActivatedRoute,
    private encontroService: EncontroService,
    private errorService: ErrorService,
    private atividadeService: AtividadeService,
    private objetoAprendizagemService: ObjetoAprendizagemService, 
    private situacaoAprendizagemService: SituacaoAprendizagemService,
    private authGuardService: AuthGuardService
  ) {}

  ngOnInit(): void {
    this.idEstudanteUsuarioLogado = this.authGuardService.getIdEstudanteUsuarioLogado();
    this.grupoId = this.route.snapshot.params['id'];
    //this.unidadeCurricularId = 1;
    this.ObterEncontros();
  }

  ObterEncontros = () => {
    this.encontroService.ObterEncontroPorGrupoId(this.grupoId, this.idEstudanteUsuarioLogado).pipe(
        delay(500),
        catchError((error) => {
          this.errorService.onError('Erro ao carregar encontros da unidade curricular.');
          return of([]);
        })
      ).subscribe((resultado) => {
        this.encontros = resultado;
        console.log(this.encontros);
        this.loading = false;
      });
  };

  showDialogDetalheEncontro(encontroId: number){
    this.displayDetalheEncontro = true;

    this.situacaoAprendizagemService.FiltrarSituacoesAprendizagemPorEncontroId(encontroId).subscribe(resultado =>{
      this.situacoesAprendizagem = resultado;
      this.loading = false;
    })
  }
}