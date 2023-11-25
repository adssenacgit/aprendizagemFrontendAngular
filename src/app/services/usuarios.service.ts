import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DadosLogin } from '../models/DadosLogin';
import { DadosRegistro } from '../models/DadosRegistros';
import { Usuario } from '../models/Usuario';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  url = environment.apiServer + 'api/Usuario';
  javaUrl = "http://localhost:8080/usuario"

  constructor(private http: HttpClient) { }

  ObterUsuarioPorId(id : string): Observable<Usuario>{
    const apiUrl = `${this.url}/${id}`;
    return this.http.get<Usuario>(apiUrl);
  }

  ObterUsuarioPorIdJava(id : string): Observable<Usuario>{
    const apiUrl = `${this.javaUrl}/buscar/${id}`;
    return this.http.get<Usuario>(apiUrl);
  }

  SalvarFoto(formData: any): Observable<any>
  {
    const apiUrl = `${this.url}/SalvarFoto`;
    return this.http.post<any>(apiUrl, formData);
  }

  RegistrarUsuario(dadosRegistro: DadosRegistro): Observable<any>{
    const apiUrl = `${this.url}/RegistrarUsuario`;
    return this.http.post<DadosRegistro>(apiUrl, dadosRegistro);
  }

  LogarUsuario(dadosLogin : DadosLogin): Observable<any>{
    const apiUrl = `${this.url}/LogarUsuario`;
    return this.http.post<DadosRegistro>(apiUrl, dadosLogin);
  }

  AtualizarUsuario(formData: any): Observable<Usuario>{
    const apiUrl = `${this.url}/${formData.id}`;
    return this.http.put<Usuario>(apiUrl, formData);
  }
}
