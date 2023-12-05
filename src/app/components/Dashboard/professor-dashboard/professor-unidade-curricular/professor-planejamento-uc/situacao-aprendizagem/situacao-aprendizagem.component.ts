import { SituacaoAprendizagemService } from 'src/app/services/situacaoaprendizagem.service';
import { Location } from '@angular/common';
import { PlanejamentoUcService } from './../../../../../../services/planejamento-uc.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PlanejamentoUC } from 'src/app/models/PlanejamentoUC';
import { SituacaoAprendizagem } from 'src/app/models/SituacaoAprendizagem';

@Component({
  selector: 'app-situacao-aprendizagem',
  templateUrl: './situacao-aprendizagem.component.html',
  styleUrls: ['./situacao-aprendizagem.component.css']
})
export class SituacaoAprendizagemComponent implements OnInit {
  form: FormGroup;
  submitted = false;
  situacao: SituacaoAprendizagem;
  planejamentoUcId: number = 0;


  constructor(
    private fb: FormBuilder,
    private route : ActivatedRoute,
    private location: Location,
    private situacaoAprendizagemService: SituacaoAprendizagemService
  ) { }

  ngOnInit(): void {
    this.planejamentoUcId = this.route.snapshot.params['id'];
    this.situacao = this.situacaoAprendizagemService.getSituacaoAprendizagem();
    console.log(this.planejamentoUcId)
    this.form = this.fb.group({
      titulo: [null, [Validators.required, Validators.minLength(2)]],
      descricao: [null, [Validators.required, Validators.minLength(4)]],
      ordem: [null, [Validators.required, Validators.minLength(4)]],
      duracao: [null, [Validators.required, Validators.minLength(5)]],
      status: [null, [Validators.required, Validators.minLength(5)]],
      grauDificuldadeId: [null, [Validators.required, Validators.minLength(5)]],
      badgeId: [null, [Validators.required, Validators.minLength(5)]],
    });
  }

  limparFormulario() {
    this.form.reset();
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  verificarCampos(): boolean {
    return this.form.valid;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.form.valid) {
      this.situacao.id = 0;
      this.situacao.titulo = this.form.value.titulo;
      this.situacao.descricao = this.form.value.descricao;
      this.situacao.ordem = this.form.value.ordem;
      this.situacao.duracao = this.form.value.duracao;
      this.situacao.status = 1;
      this.situacao.planejamentoUCId = Number(this.planejamentoUcId);
      this.situacao.grauDificuldadeId = 1;
      this.situacao.badgeId = 0;
      console.log(this.situacao);
      // envia a pergunta
      // this.service.NovoChapterAssuntoJava(this.pergunta).subscribe(() => {
      //   console.log('Pergunta enviada');
      // });
      this.situacaoAprendizagemService.criarSituacaoAprendizagem(this.situacao)
        .subscribe(() => {
          console.log('Situação de aprendizagem criada');
        })
    }
  }

  goBack() {
    this.location.back();
  }

}
