import { Component, OnInit } from '@angular/core';
import { Badge } from 'src/app/models/Badge';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { BadgeService } from 'src/app/services/badge.service';

@Component({
  selector: 'app-usuario-badges',
  templateUrl: './usuario-badges.component.html',
  styleUrls: ['./usuario-badges.component.css']
})
export class UsuarioBadgesComponent implements OnInit {
  badges: Badge[]=[];
  badge : Badge = new Badge;
  idEstudante: number;


  constructor(
    private badgeService: BadgeService,
    private authGuardService: AuthGuardService
  ) {
    this.badge.imagem="";

    this.badges.push(this.badge);
    this.badges.push(this.badge);
    this.badges.push(this.badge);
  }

  ngOnInit(): void {

    this.idEstudante = this.authGuardService.getIdEstudanteUsuarioLogado();

    this.badgeService.ObterBadgesPeloEstudanteId(this.idEstudante).subscribe(resultado => {
      this.badges = resultado;
    })
  }

  getImage(baseImage: string): any {

    let objectURL = 'data:image/png;base64,' + atob(baseImage);
    return objectURL;
  }

}
