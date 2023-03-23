import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Funcao } from '../models/Funcao';

const httpOptions = {
  headers : new HttpHeaders({
    'Content-Type' : 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('TokenUsuarioLogado')}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class FuncoesService {
  url = environment.apiServer + 'api/Funcao';

  constructor(private http : HttpClient) { }

  ObterTodos(): Observable<Funcao[]>
  {
    return this.http.get<Funcao[]>(this.url);
  }

  ObterFuncaoById(funcaoId: string): Observable<Funcao>
  {
    const apiURL = `${this.url}/${funcaoId}`;
    return this.http.get<Funcao>(apiURL);    
  }

  NovaFuncao(funcao: Funcao): Observable<any>
  {
    return this.http.post<Funcao>(this.url, funcao);
  }

  AtualizarFuncao(funcaoId: string, funcao: Funcao) : Observable<any>
  {
    const apiUrl = `${this.url}/${funcaoId}`;
    return this.http.put<Funcao>(apiUrl, funcao);
  }

  ExcluirFuncao(funcaoId: string): Observable<any>
  {
    const apiUrl = `${this.url}/${funcaoId}`;
    return this.http.delete<string>(apiUrl, httpOptions);
  }

  FiltrarFuncoes(nomeFuncao : string): Observable<Funcao[]>
  {
    const apiUrl = `${this.url}/FiltrarFuncoes/${nomeFuncao}`;
    return this.http.get<Funcao[]>(apiUrl);
  }
}
