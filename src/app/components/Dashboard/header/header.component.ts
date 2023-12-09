import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SenacCoinMovimentacao } from 'src/app/models/SenacCoinMovimentacao';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { SenacCoinMovimentacaoService } from 'src/app/services/senac-coin-movimentacao.service';
import { SenacCoinService } from 'src/app/services/senac-coin.service';
import { SenacCoin } from 'src/app/models/SenacCoin';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  idUsuarioLogado : string;
  sidebarVisible: boolean;
  sidebarVisible2: boolean;
  loading: boolean = true;
  isProfessor: boolean;

  list = [
    {
      title: "Venha participar da super aula de Power BI",
      date: "01/06/2023",
    },
    {
      title: "Evento de carreira no auditório",
      date: "18/06/2023",
    }
  ];
  constructor(
    private authGuardService: AuthGuardService
    ) { }

  ngOnInit(): void {
    this.isProfessor = this.authGuardService.VerificarProfessor();
    this.idUsuarioLogado = this.authGuardService.getIdUsuarioLogado();
  }
}
