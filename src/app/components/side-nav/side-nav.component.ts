import { Component, OnInit } from '@angular/core';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { navbarData } from '../Dashboard/dashboard/nav-data';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {

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
