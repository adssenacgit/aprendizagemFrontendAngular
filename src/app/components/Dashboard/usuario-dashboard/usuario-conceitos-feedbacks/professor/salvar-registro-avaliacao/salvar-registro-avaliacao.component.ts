import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GrupoService} from "../../../../../../services/grupo.service";
import {Grupo} from "../../../../../../models/Grupo";
import {AuthGuardService} from "../../../../../../services/auth-guard.service";
import {Participante} from "../../../../../../models/Participante";
import {EstudantesService} from "../../../../../../services/estudante.service";
import {Estudante} from "../../../../../../models/Estudante";
import {EncontroService} from "../../../../../../services/encontro.service";
import {SituacaoAprendizagemService} from "../../../../../../services/situacaoaprendizagem.service";
import {AtividadeService} from "../../../../../../services/atividade.service";
import {Atividade} from "../../../../../../models/Atividade";
import {RegistroAvaliacaoService} from "../../../../../../services/registro-avaliacao.service";
import {RegistroAvaliacao} from "../../../../../../models/RegistroAvaliacao";
import {Mock} from "./data/mock";
import {delay, forkJoin, switchMap} from "rxjs";
import {AcompanhamentoService} from "../../../../../../services/acompanhamento.service";
import {Acompanhamento} from "../../../../../../models/Acompanhamento";
import {AvaliacaoConceito} from "../../../../../../models/AvaliacaoConceito";

@Component({
  selector: 'app-salvar-registro-avaliacao',
  templateUrl: './salvar-registro-avaliacao.component.html',
  styleUrls: ['./salvar-registro-avaliacao.component.css']
})
export class SalvarRegistroAvaliacaoComponent implements OnInit {
  @Input() $isProfessor: boolean = false;
  mock: Mock = new Mock();

  isLoading: boolean = true;
  idUsuarioLogado: string = '';
  formGroup: FormGroup;

  grupos: Grupo[] = [];
  estudantes: Estudante[] = [];
  atividades: Atividade[] = [];
  acompanhamentos: Acompanhamento[] = [];
  avaliacaoTipo: string[] = ['Ciclo 1', 'Ciclo 2', 'Recuperação Ciclo 1', 'Recuperação Ciclo 2', 'Conceito Final', 'Resultado'];
  avaliacaoConceito: string[] = ['O', 'B', 'S', 'I', 'SA'];
  registroAvaliacoes: RegistroAvaliacao[] = [];

  grupoFormModelStandalone: string = '';

  avaliacaoTipoCiclo1: string = 'Ciclo 1';
  avaliacaoConceitoCiclo1: string = '';
  comentarioCiclo1: string = '';

  avaliacaoTipoCiclo2: string = 'Ciclo 2';
  avaliacaoConceitoCiclo2: string = '';
  comentarioCiclo2: string = '';

  avaliacaoTipoRecuperacaoCiclo1: string = 'Recuperação Ciclo 1';
  avaliacaoConceitoRecuperacaoCiclo1: string = '';
  comentarioRecuperacaoCiclo1: string = '';

  avaliacaoTipoRecuperacaoCiclo2: string = 'Recuperação Ciclo 2';
  avaliacaoConceitoRecuperacaoCiclo2: string = '';
  comentarioRecuperacaoCiclo2: string = '';

  avaliacaoTipoConceitoFinal: string = 'Conceito Final';
  avaliacaoConceitoConceitoFinal: string = '';
  comentarioConceitoFinal: string = '';

  avaliacaoTipoResultado: string = 'Resultado';
  avaliacaoConceitoResultado: string = '';
  comentarioResultado: string = '';

  constructor(
    private _formBuilder: FormBuilder,
    private _grupoService: GrupoService,
    private _estudanteService: EstudantesService,
    private _encontroService: EncontroService,
    private _situacaoAprendizagemService: SituacaoAprendizagemService,
    private _registroAvaliacaoService: RegistroAvaliacaoService,
    private _atividadeService: AtividadeService,
    private _authGuardService: AuthGuardService,
    private _acompanhamentoService: AcompanhamentoService
  ) {
  }

  ngOnInit(): void {
    this._capturarIdUsuarioLogado();
    this._montarFormulario();
    this._listarGruposQueOProfessorLeciona();
  }

  private _listarRegistroAvaliacoesPeloIdEstudante(idEstudante: number): void {
    this._registroAvaliacaoService.ObterRegistrosAvaliacaoPeloEstudanteId(idEstudante).subscribe({
      next: ($registroAvaliacoes) => {
        this.registroAvaliacoes = $registroAvaliacoes;
      }
    });
  }

  private _listarGruposQueOProfessorLeciona() {
    this._grupoService.ObterTodosGrupos().subscribe({
      next: ($grupos) => {
        $grupos.forEach(grupo => {
          this._estudanteService.ObterEstudanteByGrupoId(grupo.id).subscribe({
            next: ($estudantes) => {
              this.estudantes = $estudantes;

              $estudantes.forEach(estudante => {
                this._listarRegistroAvaliacoesPeloIdEstudante(estudante.id);
                this.grupos = $grupos;

                // this._encontroService.ObterEncontroPorGrupoId(grupo.id, estudante.id).subscribe({
                //   next: ($encontros) => {
                //     $encontros.forEach(encontro => {

                      // this._situacaoAprendizagemService.FiltrarSituacoesAprendizagemPorEncontroId(encontro.id).subscribe({
                      //   next: ($situacoesAprendizagem) => {
                      //     $situacoesAprendizagem.forEach(situacaoAprendizagem => {

                            // this._atividadeService.FiltrarAtividadebySituacaoAprendizagemId(situacaoAprendizagem.id).subscribe({
                            //   next: ($atividades) => {
                            //     this.atividades = $atividades;
                            //   }
                            // });

                            this._acompanhamentoService.ObterAcompanhamentoPeloGrupoIdPeloEstudanteId(grupo.id, estudante.id).subscribe({
                              next: ($acompanhamentos) => {
                                console.log($acompanhamentos)
                                  this.acompanhamentos = $acompanhamentos;
                              }
                            });
                      //     });
                      //   }
                      // });
                //     });
                //   }
                // });
              });
            }
          });
        });
      },
    });
  }

  private _montarFormulario(): void {
    this.formGroup = this._formBuilder.group({
      data: new FormControl(new Date()),
      comentario: new FormControl('', Validators.required),
      status: new FormControl(0),
      avaliacaoTipoId: new FormControl(0),
      avaliacaoTipo: this._formBuilder.group({
        descricao: new FormControl('', Validators.required),
        status: new FormControl(0),
      }),
      participanteId: new FormControl(0),
      participante: new FormControl(new Participante()),
      avaliacaoConceitoId: new FormControl(0),
      avaliacaoConceito: this._formBuilder.group({
        id: new FormControl(0),
        descricao: new FormControl('', Validators.required),
        status: new FormControl(0),
        valorMax: new FormControl(0),
        valorMin: new FormControl(0),
      })
    })
    ;
  }

  private _capturarIdUsuarioLogado(): void {
    this.idUsuarioLogado = this._authGuardService.getIdUsuarioLogado();
  }

  downloadFile(downloadLink: string): void {
    // Implemente a lógica para o download aqui, utilizando o link ou dados fornecidos.
    // Por exemplo, redirecionar o usuário para o link de download ou iniciar o download.
  }

  getSeverity(avaliacaoConceito: AvaliacaoConceito['descricao']): string {
    switch (avaliacaoConceito) {
      case 'O':
        return 'success';
      case 'B':
        return 'primary';
      case 'S':
        return 'warning';
      case 'I':
        return 'danger';
      case 'SA':
        return 'danger';
      default :
        return 'warning';
    }
  }

  onChange(data: any) {
    this.isLoading = true;
    this.grupoFormModelStandalone = data.value;
    this._listarGruposQueOProfessorLeciona();

    setTimeout(() => {
      this.isLoading = false;
    }, 5000)
  }

  onSubmit(): void {
    if (this.formGroup.valid) {
      this._registroAvaliacaoService.SalvarRegistroAvaliacao(this.formGroup.value).subscribe({
        next: ($registroAvaliacao) => {
          console.log(this.formGroup.value);
          console.log($registroAvaliacao);
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }
}
