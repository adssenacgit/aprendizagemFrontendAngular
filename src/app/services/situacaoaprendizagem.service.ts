import { SituacaoAprendizagem } from './../models/SituacaoAprendizagem';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('TokeUsuarioLogado')}`,
    }),
  };

@Injectable({
  providedIn: 'root'
})
export class SituacaoAprendizagemService {

  url = environment.apiServer + 'api/SituacaoAprendizagem';
  constructor(private https: HttpClient) { }

  ObterSituacaoAprendizagemPorId (id: number) : Observable<SituacaoAprendizagem>
  {
    const apiUrl = `${this.url}/${id}`;
    return this.https.get<SituacaoAprendizagem>(apiUrl);
  }

  criarSituacaoAprendizagem(situacao: SituacaoAprendizagem): Observable<SituacaoAprendizagem> {
    return this.https.post<SituacaoAprendizagem>(this.url, situacao);
  }

  obterSituacoesAprendizagem(): Observable<SituacaoAprendizagem[]> {
    return this.https.get<SituacaoAprendizagem[]>(this.url);
  }

  atualizarSituacaoAprendizagem(id: number, situacao: SituacaoAprendizagem): Observable<SituacaoAprendizagem> {
    return this.https.put<SituacaoAprendizagem>(`${this.url}/${id}`, situacao);
  }

  excluirSituacaoAprendizagem(id: number): Observable<void> {
    return this.https.delete<void>(`${this.url}/${id}`);
  }

  filtrarSituacoesAprendizagemPorEncontroId (id: number) : Observable<SituacaoAprendizagem[]>
  {
    const apiUrl = `${this.url}/FiltrarSituacoesAprendizagemPorEncontroId/${id}`;
    return this.https.get<SituacaoAprendizagem[]>(apiUrl);
  }

  filtrarSituacoesAprendizagemPorDescricao (descricao: string) : Observable<SituacaoAprendizagem[]>
  {
    const apiUrl = `${this.url}/FiltrarSituacaoAprendizagem/${descricao}`;
    return this.https.get<SituacaoAprendizagem[]>(apiUrl);
  }

  filtrarAtividadesEObjetosPorSitucacaoId(id: number) : Observable<SituacaoAprendizagem[]>
  {
    const apiUrl = `${this.url}/FiltrarAtividadesEObjetosBySituacaoAprendizagemId/${id}`;
    return this.https.get<SituacaoAprendizagem[]>(apiUrl);
  }

  filtrarSituacaoAprendizagemAtividadesEObjetosByEncontroId(id: number) :  Observable<SituacaoAprendizagem[]>
  {
    const apiUrl = `${this.url}/FiltrarSituacaoAprendizagemAtividadesEObjetosByEncontroId/${id}`;
    return this.https.get<SituacaoAprendizagem[]>(apiUrl);
  }

  FiltrarSituacoesAprendizagemPorEncontroId(id: number) :  Observable<SituacaoAprendizagem[]>
  {
    const apiUrl = `${this.url}/FiltrarSituacoesAprendizagemPorEncontroId/${id}`;
    return this.https.get<SituacaoAprendizagem[]>(apiUrl);
  }

  ObterSituacaoAprendizagem() : Observable<SituacaoAprendizagem[]> {
    const apiUrl = `${this.url}`;
    return this.https.get<SituacaoAprendizagem[]>(apiUrl);
  }

  filtrarAtividadesEObjetosBySituacaoAprendizagemId(id: number): Observable<SituacaoAprendizagem> {
    const apiUrl = `${this.url}/FiltrarAtividadesEObjetosBySituacaoAprendizagemId/${id}`;
    return this.https.get<SituacaoAprendizagem>(apiUrl);
  }

}
