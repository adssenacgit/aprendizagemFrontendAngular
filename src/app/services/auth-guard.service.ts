import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private jwtHelper: JwtHelperService, private router: Router) { }

  canActivate(): boolean {
      //const token = localStorage.getItem('TokenUsuarioLogado');
      const token = sessionStorage.getItem('TokenUsuarioLogado');
      if(token && !this.jwtHelper.isTokenExpired(token)){
        return true;
      }
      this.router.navigate(['usuarios/loginusuario']);
      return false;
  }

  VerificarAdministrador(): boolean {
    //const token = String(localStorage.getItem('TokenUsuarioLogado'));
    const token = String(sessionStorage.getItem('TokenUsuarioLogado'));
    //const tokenUsuario = decode(token);

    const tokenUsuario = this.getDecodedAccessToken(token);

    const decodedName = tokenUsuario['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    const decodedRole = tokenUsuario['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
    const decodedIdEstudante = tokenUsuario['http://schemas.microsoft.com/ws/2008/06/identity/claims/upn'];

    if(decodedRole === 'Administrador'){
      return true;
    }else{
      return false;
    }
    //if(token){
    //  const tokenUsuario = this.jwtHelper.decodeToken(token);
    //  if(tokenUsuario.role === 'Administrador'){
    //    return true;
    //  }
    //  else{
    //    return false;
    //  }
    //}
    //else{
    //  return false;
  }

  getIdUsuarioLogado(): string {
    //const token = String(localStorage.getItem('TokenUsuarioLogado'));
    const token = String(sessionStorage.getItem('TokenUsuarioLogado'));
    const tokenUsuario = this.getDecodedAccessToken(token);
    const decodedName = tokenUsuario['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'];
    return decodedName;
  }
    
  getNomeUsuarioLogado(): string {
    //const token = String(localStorage.getItem('TokenUsuarioLogado'));
    const token = String(sessionStorage.getItem('TokenUsuarioLogado'));
    const tokenUsuario = this.getDecodedAccessToken(token);
    const decodedName = tokenUsuario['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname'];
    return decodedName;
  }

  getIdEstudanteUsuarioLogado(): number {
    const token = String(sessionStorage.getItem('TokenUsuarioLogado'));
    const tokenUsuario = this.getDecodedAccessToken(token);
    const decodedName = tokenUsuario['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn'];
    return decodedName;
  }

  getDecodedAccessToken(token: string): any {
    try {
      return decode(token);
    } catch(Error) {
      return null;
    }
  }
}
