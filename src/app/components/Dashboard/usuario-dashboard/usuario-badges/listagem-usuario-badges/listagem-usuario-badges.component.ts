import {Component, OnInit} from '@angular/core';
import {BadgeService} from "../../../../../services/badge.service";
import {AuthGuardService} from "../../../../../services/auth-guard.service";
import {Badge} from "../../../../../models/Badge";

@Component({
  selector: 'app-listagem-usuario-badges',
  templateUrl: './listagem-usuario-badges.component.html',
  styleUrls: ['./listagem-usuario-badges.component.css']
})
export class ListagemUsuarioBadgesComponent  implements OnInit {
  badges: Badge[] = [];
  constructor(private _badgeService: BadgeService, private _authGuardService: AuthGuardService) {
  }
  ngOnInit(): void {
    this._badgeService.ObterBadgesPeloEstudanteId(this._authGuardService.getIdEstudanteUsuarioLogado())
      .subscribe({
        next:(response)=>{
          this.badges = response;
        }
      })
  }
}
