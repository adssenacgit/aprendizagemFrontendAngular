import { UsuariosService } from './../../../../services/usuarios.service';
import { AuthGuardService } from './../../../../services/auth-guard.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-usuario-perfil',
  templateUrl: './usuario-perfil.component.html',
  styleUrls: ['./usuario-perfil.component.css']
})

export class UsuarioPerfilComponent implements OnInit {


  usuarioId: string;
  usuario: Usuario;
  usuarioUpdateForm: FormGroup;
  edited: boolean = false;

  constructor(
    private authGuardService: AuthGuardService,
    private usuariosService: UsuariosService,
    private fb: FormBuilder
  ) {
    this.usuarioId = this.authGuardService.getIdUsuarioLogado();
    this.usuarioUpdateForm = this.fb.group({
      id: [null, [Validators.required, Validators.minLength(3)]],
      cpf: [null, [Validators.required, Validators.minLength(3)]],
      foto: [null, [Validators.required, Validators.minLength(3)]],
      apelido: [null, [Validators.required, Validators.minLength(3)]],
      email: [null, [Validators.required, Validators.minLength(3)]],
      // password: [null, [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit() {
    this.usuariosService.ObterUsuarioPorId(this.usuarioId)
      .subscribe(response => {
        this.usuario = response
        this.usuarioUpdateForm.patchValue(this.usuario);
      })
  }

  get propriedade() {
    return this.usuarioUpdateForm.controls;
  }

  onImageUpload(event: any) {
    const fileInput = event.target;
    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      const reader = new FileReader();
      reader.onloadend = (e) => {
        const base64String = e.target?.result as string;
        const base64Data = base64String.split(',')[1];
        this.usuarioUpdateForm.patchValue({ foto: base64Data });
      };
      reader.readAsDataURL(file);
    }
  }

  atualizarUsuario() {
    if(this.usuarioUpdateForm.valid) {
      const usuarioAtualizado = this.usuarioUpdateForm.value;
      const usuarioComSenha = {...usuarioAtualizado, password: "123456"}
      console.log(usuarioComSenha)
      this.usuariosService.AtualizarUsuario(usuarioComSenha).subscribe(
        res => console.log(res)
      )
    }
  }

}
