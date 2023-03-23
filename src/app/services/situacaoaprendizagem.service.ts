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
    const apiUrl = `${this.url}/FiltrarSituacaoAprendizagemAtividadesEObjetosByEncontroId/${id}`;
    return this.https.get<SituacaoAprendizagem[]>(apiUrl);
  }

}
