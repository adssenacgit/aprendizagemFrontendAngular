import { Component, OnInit } from '@angular/core';
import { Badge } from 'src/app/models/Badge';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { BadgeService } from 'src/app/services/badge.service';

@Component({
  selector: 'app-listagem-ultimas-badges',
  templateUrl: './listagem-ultimas-badges.component.html',
  styleUrls: ['./listagem-ultimas-badges.component.css']
})
export class ListagemUltimasBadgesComponent implements OnInit {
  badges: Badge[]=[];
  badge : Badge = new Badge;
  idUsuarioLogado: string;


  constructor(
    private badgeService: BadgeService,
    private authGuardService: AuthGuardService
  ) { }

  ngOnInit(): void {

    this.idUsuarioLogado = this.authGuardService.getIdUsuarioLogado();

    this.badgeService.ObterBadgesRecentesPeloUsuarioId(this.idUsuarioLogado).subscribe(resultado => {
      this.badges = resultado;
    })
  }

  getImage(baseImage: string): any {

    let objectURL = 'data:image/png;base64,' + atob(baseImage);
    return objectURL;
  }

}
