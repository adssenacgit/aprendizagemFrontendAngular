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

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

	collapsed = true;
	screeWidth: 0;
	navData = navbarData;

  isAdministrador: boolean;
  constructor(private authGuard: AuthGuardService) { }

  ngOnInit(): void {
    this.isAdministrador = this.authGuard.VerificarAdministrador();
  }

	toggleCollapse(): void {
		this.collapsed = !this.collapsed;
	}

	closeSidenav(): void {
		this.collapsed = false;
	}

}
