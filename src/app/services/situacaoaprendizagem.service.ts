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

  FiltrarSituacoesAprendizagemPorEncontroId (id: number) : Observable<SituacaoAprendizagem[]>
  {
    const apiUrl = `${this.url}/FiltrarSituacoesAprendizagemPorEncontroId/${id}`;
    return this.https.get<SituacaoAprendizagem[]>(apiUrl);
  }

  ObterSituacaoAprendizagemPorId (id: number) : Observable<SituacaoAprendizagem>
  {
    const apiUrl = `${this.url}/${id}`;
    return this.https.get<SituacaoAprendizagem>(apiUrl);
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
