import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Acompanhamento } from '../models/Acompanhamento';

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('TokeUsuarioLogado')}`,
    }),
  };

@Injectable({
  providedIn: 'root'
})
export class AcompanhamentoService {

  url = environment.apiServer + 'api/Acompanhamento';
  constructor(private https: HttpClient) { }

  ObterTodos() : Observable<Acompanhamento[]>
  {
    return this.https.get<Acompanhamento[]>(this.url);
  }

  ObterAcompanhamentoPeloGrupoIdPeloEstudanteId (grupoId: number, estudanteId: number) : Observable<Acompanhamento[]>
  {
    const apiUrl = `${this.url}/FiltrarByGrupoIdByEstudanteId/${grupoId}/${estudanteId}`;
    return this.https.get<Acompanhamento[]>(apiUrl);
  }

  ObterAcompanhametoPeloId(acompanhamentoId: number): Observable<Acompanhamento>
  {
    const apiUrl = `${this.url}/${acompanhamentoId}`;
    return this.https.get<Acompanhamento>(apiUrl);
  }

  NovoAcompanhamento(acompanhamento: Acompanhamento): Observable<any>{
    return this.https.post<any>(this.url, acompanhamento, httpOptions);
  }

  AtualizarAcompanhamento(acompanhamentoId: number, acompanhamento: Acompanhamento): Observable<any>{
    const apiUrl = `${this.url}/${acompanhamentoId}`;
    return this.https.put<Acompanhamento>(apiUrl, acompanhamento, httpOptions);
  }

  ExcluirAcompanhamento(acompanhamentoId: number): Observable<any>{
    const apiUrl = `${this.url}/${acompanhamentoId}`;
    return this.https.delete<Acompanhamento>(apiUrl, httpOptions);    
  }

  FiltrarAcompanhamento(nomeUsuario: string) : Observable<Acompanhamento[]>
  {
    const apiUrl = `${this.url}/FiltrarAcompanhamento/${nomeUsuario}`;
    return this.https.get<Acompanhamento[]>(apiUrl);
  }

}

