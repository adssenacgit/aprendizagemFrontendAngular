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

  registrosAvaliacoes: { [key: string]: RegistroAvaliacao[] } = {};
  idEstudanteUsuarioLogado: number = 0;
  selectedComentario: string = "";

  atividades: Atividade[] = [];
  grupos: Grupo[] = [];
  acompanhamentos: Acompanhamento[] = [];

  constructor(
    private registroAvaliacaoService: RegistroAvaliacaoService,
    private acompanhamentoService: AcompanhamentoService,
    private grupoService: GrupoService,
    private authGuardService: AuthGuardService,
    private encontroService: EncontroService,
    private situacaoAprendizagem: SituacaoAprendizagemService,
    private atividadeService: AtividadeService
  ) {
  }

  ngOnInit(): void {

    this.idEstudanteUsuarioLogado = this.authGuardService.getIdEstudanteUsuarioLogado();

    this.grupoService.ObterGrupoPeloEstudanteIdSemestreAtivo(this.idEstudanteUsuarioLogado).subscribe($grupos => {
      this.grupos = $grupos;

      this.grupos.forEach(grupo => {
          this.registroAvaliacaoService.ObterRegistrosPeriodoAtivoFilterByEstudanteIdByGrupoId(this.idEstudanteUsuarioLogado, grupo.id).subscribe($registrosAvaliacoes => {
            this.registrosAvaliacoes[grupo.unidadeCurricular.nomeCurto] = $registrosAvaliacoes;

            this.acompanhamentoService.ObterAcompanhamentoPeloGrupoIdPeloEstudanteId(grupo.id, this.idEstudanteUsuarioLogado).subscribe($acompanhamentos => {
              // em caso de teste o hard log deve apresentar lista vazia [], exceto para grupo.id = 1
              this.acompanhamentos = $acompanhamentos;
            });
          });

          this.encontroService.ObterEncontroPorGrupoId(grupo.id, this.idEstudanteUsuarioLogado).subscribe($encontros => {
            $encontros.forEach(encontro => {
              this.situacaoAprendizagem.FiltrarSituacoesAprendizagemPorEncontroId(encontro.grupoId).subscribe($situacoesAprendizagem => {
                $situacoesAprendizagem.forEach(situacaoAprendizagem => {
                  this.atividadeService.FiltrarAtividadebySituacaoAprendizagemId(situacaoAprendizagem.id).subscribe($atividades => {
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

