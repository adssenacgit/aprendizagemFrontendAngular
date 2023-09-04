import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Mensagem } from '../models/Mensagem';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('TokeUsuarioLogado')}`,
    }),
  };

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  url = environment.apiServer + 'api/Mensagem';
  constructor(private https: HttpClient) { }


  ObterMensagemPorUsuarioId(usuarioId: string): Observable<Mensagem[]>
  {
    const apiUrl = `${this.url}/FiltrarMensagemByUsuarioId/${usuarioId}`;
    return this.https.get<Mensagem[]>(apiUrl);
  }

  NovaMensagem(mensagem: Mensagem): Observable<any>{
    return this.https.post<Mensagem>(this.url, mensagem, httpOptions);
  }
}