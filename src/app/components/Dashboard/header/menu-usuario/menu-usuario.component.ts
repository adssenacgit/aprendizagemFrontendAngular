import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrls: ['./menu-usuario.component.css']
})
export class MenuUsuarioComponent implements OnInit {
  items: MenuItem[];
  nomeUsuarioLogado: string; //= localStorage.getItem("NomeUsuarioLogado");

  constructor(
    private router: Router,
    private authGuardService: AuthGuardService
    ) { }

  ngOnInit() {

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
    localStorage.clear();
    this.router.navigate(["usuarios/loginusuario"]);
  }
}