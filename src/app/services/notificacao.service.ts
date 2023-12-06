import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Oferta } from '../models/Oferta';
import {Notificacao} from "../models/Notificacao";

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('TokeUsuarioLogado')}`,
    }),
  };

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {

  url = environment.apiServer + 'api/Notificacao';
  constructor(private https: HttpClient) { }

  CadastrarNotificacao(notificacao: Notificacao): Observable<Notificacao>
  {
    const apiUrl = `${this.url}`;
    return this.https.post<Notificacao>(apiUrl, notificacao, httpOptions);
  }

  ObterNotificacaoPeloIdEstudante(id: string): Observable<Notificacao[]>
  {
    const apiUrl = `${this.url}/FiltrarNotificacaoByUsuarioId/${id}`;
    return this.https.get<Notificacao[]>(apiUrl);
  }

}
