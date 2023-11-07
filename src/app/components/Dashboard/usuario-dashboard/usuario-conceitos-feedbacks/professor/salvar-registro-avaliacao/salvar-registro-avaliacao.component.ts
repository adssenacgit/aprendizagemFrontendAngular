import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {GrupoService} from "../../../../../../services/grupo.service";
import {Grupo} from "../../../../../../models/Grupo";
import {AuthGuardService} from "../../../../../../services/auth-guard.service";
import {AvaliacaoTipo} from "../../../../../../models/AvaliacaoTipo";
import {Participante} from "../../../../../../models/Participante";
import {AvaliacaoConceito} from "../../../../../../models/AvaliacaoConceito";
import {EstudantesService} from "../../../../../../services/estudante.service";
import {Estudante} from "../../../../../../models/Estudante";
import {EncontroService} from "../../../../../../services/encontro.service";
import {SituacaoAprendizagemService} from "../../../../../../services/situacaoaprendizagem.service";
import {AtividadeService} from "../../../../../../services/atividade.service";
import {Atividade} from "../../../../../../models/Atividade";
import {RegistroAvaliacaoService} from "../../../../../../services/registro-avaliacao.service";

@Component({
  selector: 'app-salvar-registro-avaliacao',
  templateUrl: './salvar-registro-avaliacao.component.html',
  styleUrls: ['./salvar-registro-avaliacao.component.css']
})
export class SalvarRegistroAvaliacaoComponent implements OnInit {
  @Input() $isProfessor: boolean = false;
  isLoading: boolean = true;
  idUsuarioLogado: string = '';
  formGroup: FormGroup;

  grupos: Grupo[] = [];
  estudantes: Estudante[] = [];
  atividades: Atividade[] = [];
  avaliacaoTipo: string[] = ['Ciclo 1', 'Ciclo 2', 'Recuperação Ciclo 1', 'Recuperação Ciclo 2', 'Conceito Final', 'Resultado'];
  avaliacaoConceito: string[] = ['O', 'B', 'S', 'I', 'SA'];

  grupoFormModelStandalone: string = '';
  estudanteFormModelStandalone: string = '';
  atividadeFormModelStandalone: string = '';

  constructor(
    private _formBuilder: FormBuilder,
    private _grupoService: GrupoService,
    private _estudanteService: EstudantesService,
    private _encontroService: EncontroService,
    private _situacaoAprendizagemService: SituacaoAprendizagemService,
    private _registroAvaliacaoService: RegistroAvaliacaoService,
    private _atividadeService: AtividadeService,
    private _authGuardService: AuthGuardService
  ) {
  }

  ngOnInit(): void {
    this._capturarIdUsuarioLogado();
    this._montarFormulario();
    this._listarGruposQueOProfessorLeciona();
  }

  private _listarGruposQueOProfessorLeciona(): void {
    this._grupoService.ObterTodosGrupos().subscribe({
      next: ($grupos) => {
        $grupos.forEach(grupo => {
          this._estudanteService.ObterEstudanteByGrupoId(grupo.id).subscribe({
            next: ($estudantes) => {
              this.estudantes = $estudantes;
            }
          });

          if (grupo.professor.usuarioId == this.idUsuarioLogado) {
            this.grupos = $grupos;
          }

          this._encontroService.ObterEncontroPorGrupoId(grupo.id, grupo.id).subscribe($encontros => {
            $encontros.forEach(encontro => {
              this._situacaoAprendizagemService.FiltrarSituacoesAprendizagemPorEncontroId(encontro.grupoId).subscribe($situacoesAprendizagem => {
                $situacoesAprendizagem.forEach(situacaoAprendizagem => {
                  this._atividadeService.FiltrarAtividadebySituacaoAprendizagemId(situacaoAprendizagem.id).subscribe($atividades => {
                    this.atividades = $atividades;
                  });
                });
              });
            });
          });
        });
      },
      complete:()=>{
        this.isLoading = false;
      }
    })
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

  onSubmit(): void {
    console.log(this.formGroup.value);

    if (this.formGroup.valid) {
      this._registroAvaliacaoService.SalvarRegistroAvaliacao(this.formGroup.value).subscribe({
        next: ($registroAvaliacao) => {
          console.log($registroAvaliacao);
        },
        error: (error) => {
          console.log(error);
        }
      });
    }
  }
}
