import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {Subscription} from "rxjs";
import {Badge} from "../../../../../../models/Badge";
import {BadgeService} from "../../../../../../services/badge.service";
import {AuthGuardService} from "../../../../../../services/auth-guard.service";
import {EstudantesService} from "../../../../../../services/estudante.service";
import {Estudante} from "../../../../../../models/Estudante";
import {Usuario} from "../../../../../../models/Usuario";
import {UsuariosService} from "../../../../../../services/usuarios.service";

@Component({
  selector: 'app-detalhe-badge',
  templateUrl: './detalhe-badge.component.html',
  styleUrls: ['./detalhe-badge.component.css']
})
export class DetalheBadgeComponent implements OnInit {
  private _subscription: Subscription = new Subscription();
  private _idBadge: number = 0;
  private _idUsuarioLogado: string = "";

  protected badge: Badge = new Badge();
  protected badges: Badge[] = [];
  protected usuario: Usuario = new Usuario();

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _badgeService: BadgeService,
    private _authGuardService: AuthGuardService,
    private _usuarioService: UsuariosService
  ) {
  }

  ngOnInit(): void {
    this._capturarIdBadgePelaRota();
    this._obterBadgePeloId();
    this._obterEstudantePeloId();
  }

  private _obterIdUsuarioLogado(): string {
    this._idUsuarioLogado = this._authGuardService.getIdUsuarioLogado();
    return this._idUsuarioLogado;
  }

  private _obterEstudantePeloId(): void {
    this._usuarioService.ObterUsuarioPorId(this._obterIdUsuarioLogado()).subscribe({
      next: ($usuario) => {
        this.usuario = $usuario;
      }
    });
  }

  private _obterBadgePeloId(): void {
    this._subscription = this._badgeService.ObterBadgesPeloId(this._idBadge).subscribe({
      next: ($badge: Badge) => {
        this.badge = $badge;
      }
    });
  }

  private _capturarIdBadgePelaRota(): void {
    this._subscription = this._activatedRoute.params.subscribe({
        next: (params: Params) =>
          this._idBadge = params['id']
      }
    )
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
