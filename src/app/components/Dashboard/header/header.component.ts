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
  sidebarVisible2: boolean;

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
    private authGuardService: AuthGuardService) { }

  ngOnInit(): void {
    this.idUsuarioLogado = this.authGuardService.getIdUsuarioLogado();
  }

}
