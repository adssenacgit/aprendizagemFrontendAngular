import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.css']
})
export class MenuUsuarioComponent implements OnInit {
  items: MenuItem[];
  nomeUsuarioLogado: string; //= localStorage.getItem("NomeUsuarioLogado");
  usuario : Usuario = new Usuario;
  idUsuarioLogado : string;

  constructor(
    private router: Router,
    private authGuardService: AuthGuardService,
    private usuarioService: UsuariosService
    ) { }

  ngOnInit() {
    this.idUsuarioLogado = this.authGuardService.getIdUsuarioLogado();

    this.usuarioService.ObterUsuarioPorId(this.idUsuarioLogado).subscribe(resultado=>{
      this.usuario = resultado;
    })

    this.nomeUsuarioLogado = this.authGuardService.getNomeUsuarioLogado();
    this.items = [{
      items: [{
        label: 'Inicio',
        icon: 'pi pi-user',
        routerLink: '/dashboard/usuariodashboard'
      },
      {
        label: 'Ofertas',
        icon: 'pi pi-th-large',
        routerLink: '/ofertas/listagemofertas'
      },
      {
        label: 'Comunidades',
        icon: 'pi pi-users',

      }
      ,{
        label: 'Editar perfil',
        icon: 'pi pi-cog',
        routerLink: '/perfil'
      },
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => {
          this.EfetuarLogout();
        }
      }
      ]
    }
    ];
  }

  EfetuarLogout(): void {
    //localStorage.clear();
    sessionStorage.clear();
    this.router.navigate(["usuarios/loginusuario"]);
  }
  getImage(baseImage:string) : any{

    let objectURL = 'data:image/png;base64,' + atob(baseImage);
    return objectURL;
  }
}
