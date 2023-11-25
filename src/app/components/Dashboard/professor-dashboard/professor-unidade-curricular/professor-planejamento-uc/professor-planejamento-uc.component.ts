import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Encontro } from 'src/app/models/Encontro';
import { ObjetoAprendizagem } from 'src/app/models/ObjetoAprendizagem';
import { PlanejamentoUC } from 'src/app/models/PlanejamentoUC';
import { SituacaoAprendizagem } from 'src/app/models/SituacaoAprendizagem';
import { EncontroService } from 'src/app/services/encontro.service';
import { GrupoService } from 'src/app/services/grupo.service';
import { PlanejamentoUcService } from 'src/app/services/planejamento-uc.service';
import { SituacaoAprendizagemService } from 'src/app/services/situacaoaprendizagem.service';

@Component({
  selector: 'app-professor-planejamento-uc',
  templateUrl: './professor-planejamento-uc.component.html',
  styleUrls: ['./professor-planejamento-uc.component.css']
})
export class ProfessorPlanejamentoUcComponent implements OnInit {

  grupoId: number;
  planejamentoUcAtual: PlanejamentoUC;
  planejamentoUcAntigas: PlanejamentoUC[];
  encontros: Encontro[]
  situacoesAprendizagem: SituacaoAprendizagem[]
  objetoAprendizagem: ObjetoAprendizagem;
  form: FormGroup;

  constructor(
    private grupoService: GrupoService,
    private planejamentoUcService: PlanejamentoUcService,
    private situacaoAprendizagemService: SituacaoAprendizagemService,
    private encontroService: EncontroService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.encontroService.currentData
      .subscribe({
        next: (response) => this.encontros = response
      })
    this.grupoId = this.grupoService.getGrupoId();
    this.planejamentoUcService.FiltrarPlanejamentoUCByGrupoId(this.grupoId)
        .subscribe({
          next: response => this.planejamentoUcAtual = response,
          complete: () => {
            this.situacaoAprendizagemService.filtrarSituacoesAprendizagemPorPlanejamentoUcIdJava(this.planejamentoUcAtual.id)
            .subscribe({
              next: response => this.situacoesAprendizagem = response
            })
          }
        })
    this.form = this.fb.group({
      titulo: [null, [Validators.required, Validators.minLength(2)]],
      descricao: [null, [Validators.required, Validators.minLength(4)]],
      arquivo: [null, [Validators.required, Validators.minLength(5)]],
      ordem: [null, [Validators.required, Validators.minLength(5)]],
      status: [null, [Validators.required, Validators.minLength(5)]],
      grauDificuldadeId: [null, [Validators.required, Validators.minLength(5)]],
      usuarioId: [null, [Validators.required, Validators.minLength(5)]],
    });
  }

  setSituacao(situacao?: SituacaoAprendizagem) {
    if(situacao){
      this.situacaoAprendizagemService.setSituacaoAprendizagem(situacao);
    }
    else {this.situacaoAprendizagemService.setSituacaoAprendizagem(new SituacaoAprendizagem())}
  }

}
