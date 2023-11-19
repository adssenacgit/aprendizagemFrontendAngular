import {Component, OnInit} from '@angular/core';
import {BadgeService} from "../../../../../../services/badge.service";
import {AuthGuardService} from "../../../../../../services/auth-guard.service";
import {Badge} from "../../../../../../models/Badge";
import {map, startWith} from "rxjs/operators";
import {UntypedFormControl} from "@angular/forms";
import {Observable} from "rxjs";
import {MatTableDataSource} from "@angular/material/table";

@Component({
  selector: 'app-listagem-tabela-badges',
  templateUrl: './listagem-badges.component.html',
  styleUrls: ['./listagem-badges.component.css']
})
export class ListagemBadgesComponent implements OnInit {
  badges: Badge[] = [];

  constructor(private _badgeService: BadgeService, private _authGuardService: AuthGuardService) {
  }

  ngOnInit(): void {
    this.obterBadgesPeloEstudanteId();
  }

  obterBadgesPeloEstudanteId(): void {
    this._badgeService.ObterBadgesPeloEstudanteId(this._authGuardService.getIdEstudanteUsuarioLogado())
      .subscribe({
        next: (response) => {
          this.badges = response;
        }
      });
  }
}
