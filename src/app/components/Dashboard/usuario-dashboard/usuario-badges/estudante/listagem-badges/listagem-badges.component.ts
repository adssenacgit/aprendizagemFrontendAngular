import {Component, OnDestroy, OnInit} from '@angular/core';
import {BadgeService} from "../../../../../../services/badge.service";
import {AuthGuardService} from "../../../../../../services/auth-guard.service";
import {Badge} from "../../../../../../models/Badge";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-listagem-tabela-badges',
  templateUrl: './listagem-badges.component.html',
  styleUrls: ['./listagem-badges.component.css']
})
export class ListagemBadgesComponent implements OnInit, OnDestroy {
  private _subscription: Subscription = new Subscription();

  protected badges: Badge[] = [];

  constructor(private _badgeService: BadgeService, private _authGuardService: AuthGuardService) {
  }

  ngOnInit(): void {
    this.obterBadgesPeloEstudanteId();
  }

  obterBadgesPeloEstudanteId(): void {
    this._subscription = this._badgeService.ObterBadgesPeloEstudanteId(this._authGuardService.getIdEstudanteUsuarioLogado())
      .subscribe({
        next: (response) => {
          this.badges = response;
        }
      });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }
}
