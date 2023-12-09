import { UsuariosService } from 'src/app/services/usuarios.service';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { SituacaoAprendizagem } from 'src/app/models/SituacaoAprendizagem';
import { Component, OnInit } from '@angular/core';
import { SituacaoAprendizagemService } from 'src/app/services/situacaoaprendizagem.service';
import { ObjetoAprendizagem } from 'src/app/models/ObjetoAprendizagem';
import { ObjetoAprendizagemService } from 'src/app/services/objetoaprendizagem.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'app-objeto-aprendizagem',
  templateUrl: './objeto-aprendizagem.component.html',
  styleUrls: ['./objeto-aprendizagem.component.css']
})
export class ObjetoAprendizagemComponent implements OnInit {

  situacaoAprendizagem: SituacaoAprendizagem;
  objetoAprendizagem: ObjetoAprendizagem = new ObjetoAprendizagem();
  form: FormGroup;
  submitted = false;
  blobs: Blob[]
  usuarioId: string;
  usuario: Usuario;

  constructor(
    private fb: FormBuilder,
    private route : ActivatedRoute,
    private location: Location,
    private situacaoAprendizagemService: SituacaoAprendizagemService,
    private objetoAprendizagemService: ObjetoAprendizagemService,
    private authGuardService: AuthGuardService,
    private usuarioService: UsuariosService
  ) { }

  ngOnInit(): void {
    this.usuarioId = this.authGuardService.getIdUsuarioLogado();
    this.usuarioService.ObterUsuarioPorId(this.usuarioId)
      .subscribe(res => this.usuario = res)
    this.situacaoAprendizagem = this.situacaoAprendizagemService.getSituacaoAprendizagem();
    this.form = this.fb.group({
      titulo: [null, [Validators.required, Validators.minLength(2)]],
      descricao: [null, [Validators.required, Validators.minLength(4)]],
      ordem: [1],
      status: [1],
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
    if (this.form.valid) {
      this.objetoAprendizagem.id = 0;
      this.objetoAprendizagem.titulo = this.form.value.titulo;
      this.objetoAprendizagem.descricao = this.form.value.descricao;
      this.objetoAprendizagem.ordem = this.form.value.ordem;
      this.objetoAprendizagem.status = 1;
      this.objetoAprendizagem.usuarioId = this.usuarioId;
      this.objetoAprendizagem.usuario = this.usuario;
      this.objetoAprendizagem.grauDificuldadeId = 1;
      this.objetoAprendizagem.grauDificuldade = {
        id: 1,
    descricao: 'Básico',
    status: 1
      }
      console.log(this.situacaoAprendizagem)
      this.atualizarSituacaoComNovoObjeto(this.objetoAprendizagem, this.situacaoAprendizagem);
    }
  }

  goBack() {
    this.location.back();
  }

  atualizarSituacaoComNovoObjeto(objeto: ObjetoAprendizagem, situacaoAtualizada: SituacaoAprendizagem) {
    this.objetoAprendizagemService.criarObjetoAprendizagemJava(objeto)
      .subscribe(
        response => {
          this.situacaoAprendizagem.objetosAprendizagem.push(response);
          this.situacaoAprendizagemService.atualizarSituacaoAprendizagemJava(situacaoAtualizada.id, situacaoAtualizada)
            .subscribe((response) => console.log(response));
        }
      )
  }
}

