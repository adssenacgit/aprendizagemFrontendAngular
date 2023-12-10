import { UsuariosService } from 'src/app/services/usuarios.service';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { SituacaoAprendizagem } from 'src/app/models/SituacaoAprendizagem';
import { Component, OnInit } from '@angular/core';
import { SituacaoAprendizagemService } from 'src/app/services/situacaoaprendizagem.service';
import { ObjetoAprendizagem } from 'src/app/models/ObjetoAprendizagem';
import { ObjetoAprendizagemService } from 'src/app/services/objetoaprendizagem.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Usuario } from 'src/app/models/Usuario';
import { MessageService } from 'primeng/api';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GrauDificuldadeService } from 'src/app/services/grau-dificuldade.service';
import { GrauDificuldade } from 'src/app/models/GrauDificuldade';
import Swal from 'sweetalert2';
import { Recurso } from 'src/app/models/Recurso';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

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
  grausDificuldade: GrauDificuldade[]

  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private location: Location,
    private situacaoAprendizagemService: SituacaoAprendizagemService,
    private objetoAprendizagemService: ObjetoAprendizagemService,
    private authGuardService: AuthGuardService,
    private usuarioService: UsuariosService,
    private grauDificuldadeService: GrauDificuldadeService
  ) { }

  ngOnInit(): void {
    this.usuarioId = this.authGuardService.getIdUsuarioLogado();
    this.usuarioService.ObterUsuarioPorId(this.usuarioId)
      .subscribe(res => {
        this.usuario = res
      })
    this.situacaoAprendizagem = this.situacaoAprendizagemService.getSituacaoAprendizagem();
    this.form = this.fb.group({
      titulo: [null, [Validators.required, Validators.minLength(2)]],
      descricao: [null, [Validators.required, Validators.minLength(4)]],
      ordem: [1],
      status: [1],
      grauDificuldade: [null],
    });
    this.grauDificuldadeService.ObterTodosJava()
      .subscribe(res => {
        this.grausDificuldade = res
      })
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
      this.objetoAprendizagem.grauDificuldade = this.form.value.grauDificuldade;
      // console.log(this.situacaoAprendizagem)
      // console.log(this.objetoAprendizagem)
      this.atualizarSituacaoComNovoObjeto(this.objetoAprendizagem, this.situacaoAprendizagem);
    }
  }

  goBack() {
    this.location.back();
  }

  atualizarSituacaoComNovoObjeto(objeto: ObjetoAprendizagem, situacaoAtualizada: SituacaoAprendizagem) {
    this.objetoAprendizagemService.criarObjetoAprendizagemJava(objeto)
      .subscribe({
        next: (response) => {
            this.situacaoAprendizagem.objetosAprendizagem.push(response);
            this.situacaoAprendizagemService.atualizarSituacaoAprendizagemJava(situacaoAtualizada.id, situacaoAtualizada)
              .subscribe(response => console.log(response));
        },
        complete: () => {
          this.limparFormulario();
          this.openSnackBar('Objeto de aprendizagem adicionado!', 'ok');
          setTimeout(() => {
            this.goBack();
          },500)
        }
      })
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
