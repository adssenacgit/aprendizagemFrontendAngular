import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Estudante } from '../models/Estudante';

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type' : 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('TokenUsuarioLogado')}`
  }),
};

@Injectable({
  providedIn: 'root'
})
export class EstudantesService {
  url:string = environment.apiServer + 'api/Estudante';

  constructor(private https: HttpClient) { }

  ObterTodos() : Observable<Estudante[]>
  {
    return this.https.get<Estudante[]>(this.url);
  }

  ObterEstudanteById (estudanteId: number) : Observable<Estudante>
  {
    const apiUrl = `${this.url}/${estudanteId}`;
    return this.https.get<Estudante>(apiUrl);
  }

  ObterEstudanteByOfertaId (ofertaId: number) :  Observable<Estudante[]>
  {
    const apiUrl = `${this.url}/FiltrarEstudanteByOfertaId/${ofertaId}`;
    return this.https.get<Estudante[]>(apiUrl);
  }

  ObterEstudanteByGrupoId (grupoId: number) :  Observable<Estudante[]>
  {
    const apiUrl = `${this.url}/FiltrarEstudanteByGrupoId/${grupoId}`;
    return this.https.get<Estudante[]>(apiUrl);
  }

  ObterEstudanteByUsuarioId (usuarioId: string) :  Observable<Estudante[]>
  {
    const apiUrl = `${this.url}/FiltrarEstudanteByUsuarioId/${usuarioId}`;
    return this.https.get<Estudante[]>(apiUrl);
  }

  Novoestudante (estudante: Estudante): Observable<any>
  {
    return this.https.post<Estudante>(this.url, estudante, httpOptions);
  }

  AtualizarEstudante(estudanteId: number, estudante: Estudante):Observable<any>
  {
    const apiUrl = `${this.url}/${estudanteId}`;
    return this.https.put<Estudante>(apiUrl, estudante, httpOptions);
  }

  ExcluirEstudante(estudanteId: number): Observable<any>
  {
    const apiUrl = `${this.url}/${estudanteId}`;
    return this.https.delete<Estudante>(apiUrl, httpOptions);
  }

  FiltrarEstudante(nomeEstudante: string) : Observable<Estudante[]>
  {
    const apiUrl = `${this.url}/FiltrarEstudantes/${nomeEstudante}`;
    return this.https.get<Estudante[]>(apiUrl);
  }
}
