import {Component, OnInit} from '@angular/core';
import {RegistroAvaliacao} from 'src/app/models/RegistroAvaliacao';
import {Grupo} from 'src/app/models/Grupo';
import {AuthGuardService} from 'src/app/services/auth-guard.service';
import {RegistroAvaliacaoService} from 'src/app/services/registro-avaliacao.service';
import {GrupoService} from 'src/app/services/grupo.service';
import {AcompanhamentoService} from 'src/app/services/acompanhamento.service';
import {Acompanhamento} from 'src/app/models/Acompanhamento';
import {EncontroService} from "../../../../services/encontro.service";
import {SituacaoAprendizagemService} from "../../../../services/situacaoaprendizagem.service";
import {AtividadeService} from "../../../../services/atividade.service";
import {Atividade} from "../../../../models/Atividade";

@Component({
  selector: 'app-conceitos-feedbacks',
  templateUrl: './usuario-conceitos-feedbacks.component.html',
  styleUrls: ['./usuario-conceitos-feedbacks.component.css']
})
export class UsuarioConceitosFeedbacksComponent implements OnInit {

  isDialogVisibleFeedback: boolean = false;
  isDialogVisibleAtividade: boolean = false;
  isLoading: boolean = true;
  isProfessor: boolean = false;
  isEstudante: boolean = false;

  registrosAvaliacoes: { [key: string]: RegistroAvaliacao[] } = {};
  selectedComentario: string = "";

  idEstudanteUsuarioLogado: number = 0;

  atividades: Atividade[] = [];
  grupos: Grupo[] = [];
  acompanhamentos: Acompanhamento[] = [];

  constructor(
    private _registroAvaliacaoService: RegistroAvaliacaoService,
    private _acompanhamentoService: AcompanhamentoService,
    private _grupoService: GrupoService,
    private _authGuardService: AuthGuardService,
    private _encontroService: EncontroService,
    private _situacaoAprendizagemService: SituacaoAprendizagemService,
    private _atividadeService: AtividadeService
  ) {
  }

  ngOnInit(): void {

    this.idEstudanteUsuarioLogado = this._authGuardService.getIdEstudanteUsuarioLogado();
    this.isProfessor = this._authGuardService.VerificarProfessor();
    this.isEstudante = this._authGuardService.VerificarEstudante();


    this._grupoService.ObterGrupoPeloEstudanteIdSemestreAtivo(this.idEstudanteUsuarioLogado).subscribe($grupos => {
      this.grupos = $grupos;

      this.grupos.forEach(grupo => {
          this._registroAvaliacaoService.ObterRegistrosPeriodoAtivoFilterByEstudanteIdByGrupoId(this.idEstudanteUsuarioLogado, grupo.id).subscribe($registrosAvaliacoes => {
            this.registrosAvaliacoes[grupo.unidadeCurricular.nomeCurto] = $registrosAvaliacoes;

            this._acompanhamentoService.ObterAcompanhamentoPeloGrupoIdPeloEstudanteId(grupo.id, this.idEstudanteUsuarioLogado).subscribe($acompanhamentos => {
              // em caso de teste o hard log deve apresentar lista vazia [], exceto para grupo.id = 1
              this.acompanhamentos = $acompanhamentos;
            });
          });

          this._encontroService.ObterEncontroPorGrupoId(grupo.id, this.idEstudanteUsuarioLogado).subscribe($encontros => {
            $encontros.forEach(encontro => {
              this._situacaoAprendizagemService.FiltrarSituacoesAprendizagemPorEncontroId(encontro.grupoId).subscribe($situacoesAprendizagem => {
                $situacoesAprendizagem.forEach(situacaoAprendizagem => {
                  this._atividadeService.FiltrarAtividadebySituacaoAprendizagemId(situacaoAprendizagem.id).subscribe($atividades => {
                    console.log($atividades)
                    this.atividades = $atividades;
                  });
                });
              });
            });
          });

        }
      )


      this.isLoading = false;
    });

  }

  showDialogFeedback(comentario: string) {
    this.isDialogVisibleFeedback = true;
    this.selectedComentario = comentario;
    this.isDialogVisibleFeedback = true;
  }

  showDialogAtividade(comentario: string) {
    this.isDialogVisibleAtividade = true;
    this.selectedComentario = comentario;
    this.isDialogVisibleAtividade = true;
  }

}

