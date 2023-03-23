import { Component, OnInit } from '@angular/core';
import { EmailValidator, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DadosRegistro } from 'src/app/models/DadosRegistros';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-registrar-usuario',
  templateUrl: './registrar-usuario.component.html',
  styleUrls: ['./registrar-usuario.component.css']
})
export class RegistrarUsuarioComponent implements OnInit {

  formulario : any;
  foto: File;
  erros: string [];
  constructor(private usuariosService : UsuariosService, 
    private router : Router) { }

  ngOnInit(): void {
    this.erros = [];
    this.formulario = new UntypedFormGroup({      
      nomecompleto: new UntypedFormControl(null, [
        Validators.required, 
        Validators.minLength(6), 
        Validators.maxLength(250)
      ]),
      cpf: new UntypedFormControl(null, [
        Validators.required, 
        Validators.minLength(1), 
        Validators.maxLength(20)
      ]),
      foto: new UntypedFormControl(null, [
        Validators.required
      ]),
      email: new UntypedFormControl(null, [
        Validators.required, 
        Validators.email, 
        Validators.minLength(10), 
        Validators.maxLength(50)
      ]),
      senha: new UntypedFormControl(null, [
        Validators.required, 
        Validators.minLength(4), 
        Validators.maxLength(50)
      ])
    })
  }

  get propriedade(){
    return this.formulario.controls;
  }

  SelecionarFoto(fileInput: any): void{
    this.foto = fileInput.target.files[0] as File;
    const reader = new FileReader();
    reader.onload = function(e: any){
      document.getElementById('foto')?.removeAttribute('hidden');
      document.getElementById('foto')?.setAttribute('src', e.target.result);
    }
    reader.readAsDataURL(this.foto);    
  }
  EnviarFormulario(): void{
    this.erros = [];
    const usuario = this.formulario.value;
    const formData : FormData = new FormData();

    if(this.foto != null){
      formData.append('file', this.foto, this.foto.name);      
    }

    this.usuariosService.SalvarFoto(formData).subscribe(resultado => {
      const dadosRegistro: DadosRegistro = new DadosRegistro();
      dadosRegistro.nomecompleto = usuario.nomecompleto;
      dadosRegistro.cpf = usuario.cpf;
      dadosRegistro.foto = resultado.foto;
      dadosRegistro.email = usuario.email;
      dadosRegistro.senha = usuario.senha;

      this.usuariosService.RegistrarUsuario(dadosRegistro).subscribe((dados) => {
        const cpfUsuarioLogado = dados.cpfUsuarioLogado;
        const usuarioId = dados.usuarioId;
        const tokenUsuarioLogado = dados.tokenUsuarioLogado;
        localStorage.setItem('CpfUsuarioLogado', cpfUsuarioLogado);
        localStorage.setItem('UsuarioId', usuarioId);
        localStorage.setItem('TokenUsuarioLogado', tokenUsuarioLogado);
        this.router.navigate(['cursos/listagemcursos']);
      },
      (err) => {
        if (err.status === 400){
          for(const campo in err.error.errors)
            if(err.error.errors.hasOwnProperty(campo))
            {
              this.erros.push(err.error.errors[campo]);
            }
        }
      });
    });
  }
}
