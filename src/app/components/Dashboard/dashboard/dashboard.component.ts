import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { navbarData } from './nav-data';
import {
	animate,
	keyframes,
	style,
	transition,
	trigger,
} from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	collapsed = true;
	screeWidth: 0;
	navData = navbarData;
  sidebarVisible: boolean;

  isAdministrador: boolean;
  constructor(private authGuard: AuthGuardService, private router: Router) { }

  ngOnInit(): void {
    this.isAdministrador = this.authGuard.VerificarAdministrador();
  }

	toggleCollapse(): void {
		this.collapsed = !this.collapsed;
	}

	closeSidenav(): void {
		this.collapsed = false;
	}
  // (click)="navigate(data.routelink)"
  navigate(link: String){
    if(link == 'mensagens'){
      this.sidebarVisible = true;
    }
    this.router.navigate([ link ])
 }

}
