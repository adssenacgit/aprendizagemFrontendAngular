import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['../dashboard/dashboard.component.css']
})
export class HeaderComponent implements OnInit {

  idUsuarioLogado : string;
  
  sidebarVisible: boolean;

  list = [
    {
      title: "Venha participar da superaula de Power BI",
      date: "01/01/2001",
    },
    {
      title: "Evento de carreira no auditório",
      date: "01/01/2001",
    }

  ];
  constructor(
    private authGuardService: AuthGuardService) { }

  ngOnInit(): void {
    this.idUsuarioLogado = this.authGuardService.getIdUsuarioLogado();
  }

}
