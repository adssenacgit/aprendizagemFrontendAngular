import { Encontro } from './../models/Encontro';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ObjetoAprendizagem } from '../models/ObjetoAprendizagem';


const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('TokeUsuarioLogado')}`,
    }),
  };

@Injectable({
  providedIn: 'root'
})
export class ObjetoAprendizagemService {

  url = environment.apiServer + 'api/ObjetoAprendizagem';
  constructor(private https: HttpClient) { }

  criarObjetoAprendizagem(objeto: ObjetoAprendizagem): Observable<ObjetoAprendizagem>
  {
    return this.https.post<ObjetoAprendizagem>(this.url, objeto);
  }

  obterObjetosAprendizagem(): Observable<ObjetoAprendizagem[]> {
    return this.https.get<ObjetoAprendizagem[]>(this.url);
  }

  obterObjetoAprendizagemPorId(id: number): Observable<ObjetoAprendizagem> {
    return this.https.get<ObjetoAprendizagem>(`${this.url}/${id}`);
  }

  atualizarObjetoAprendizagem(id: number, objeto: ObjetoAprendizagem): Observable<ObjetoAprendizagem>
  {
    return this.https.put<ObjetoAprendizagem>(`${this.url}/${id}`, objeto);
  }

  excluirObjetoAprendizagem(id: number): Observable<void> {
    return this.https.delete<void>(`${this.url}/${id}`);
  }

  FiltrarObjetoAprendizagemPorSituacaoAprendizagemId (id: number) : Observable<ObjetoAprendizagem[]>
  {
    const apiUrl = `${this.url}/FiltrarObjetoAprendizagemBySituacaoAprendizagemId/${id}`;
    return this.https.get<ObjetoAprendizagem[]>(apiUrl);
  }

  FiltrarObjetoAprendizagemPorIndicadorCompetenciaId (id: number) : Observable<ObjetoAprendizagem[]>
  {
    const apiUrl = `${this.url}/FiltrarObjetoAprendizagemByIndicadorCompetenciaId/${id}`;
    return this.https.get<ObjetoAprendizagem[]>(apiUrl);
  }

  FiltrarObjetoAprendizagemPorDescricao (descricao: string) : Observable<ObjetoAprendizagem[]>
  {
    const apiUrl = `${this.url}/FiltrarObjetoAprendizagem/${descricao}`;
    return this.https.get<ObjetoAprendizagem[]>(apiUrl);
  }

}
