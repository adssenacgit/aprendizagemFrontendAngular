import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/Usuario';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuario-dados',
  templateUrl: './usuario-dados.component.html',
  styleUrls: ['./usuario-dados.component.css']
})
export class UsuarioDadosComponent implements OnInit {

  usuario : Usuario
  idUsuarioLogado : string;

  constructor(
    private usuarioService : UsuariosService,
    private authGuardService: AuthGuardService
    ) { }

  ngOnInit(): void {
    this.idUsuarioLogado = this.authGuardService.getIdUsuarioLogado();

    this.usuarioService.ObterUsuarioPorId(this.idUsuarioLogado).subscribe(resultado=>{
      this.usuario = resultado;
    })
  }

  getImage(baseImage:string) : any{

    let objectURL = 'data:image/png;base64,' + atob(baseImage);
    return objectURL;
  }

}