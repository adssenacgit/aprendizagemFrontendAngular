import { Component, OnInit } from '@angular/core';
import { SenacCoin } from 'src/app/models/SenacCoin';
import { Usuario } from 'src/app/models/Usuario';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { SenacCoinService } from 'src/app/services/senac-coin.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-usuario-dados',
  templateUrl: './usuario-dados.component.html',
  styleUrls: ['./usuario-dados.component.css']
})
export class UsuarioDadosComponent implements OnInit {

  usuario : Usuario = new Usuario;
  idUsuarioLogado : string;
  senacCoin: SenacCoin;

  constructor(
    private usuarioService : UsuariosService,
    private authGuardService: AuthGuardService,
    private senacCoinService: SenacCoinService
    ) { }

  ngOnInit(): void {
    this.idUsuarioLogado = this.authGuardService.getIdUsuarioLogado();

    this.usuarioService.ObterUsuarioPorId(this.idUsuarioLogado).subscribe(resultado=>{
      this.usuario = resultado;
    })

    this.senacCoinService.ObterSenacCoinPeloUsuarioId(this.idUsuarioLogado).subscribe(resultado => {
      this.senacCoin = resultado;
    })
  }

  getImage(baseImage:string) : any{

    let objectURL = 'data:image/png;base64,' + atob(baseImage);
    return objectURL;
  }

}