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
  javaUrl = 'http://localhost:8080/acompanhamento'
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

  ObterAcompanhamentoPeloGrupoIdPeloEstudanteIdJava (grupoId: number, estudanteId: number) : Observable<Acompanhamento[]>
  {
    const apiUrl = `${this.javaUrl}/filtrarByGrupoIdByEstudanteId/${grupoId}/${estudanteId}`;
    return this.https.get<Acompanhamento[]>(apiUrl);
  }

  ObterAcompanhametoPeloId(acompanhamentoId: number): Observable<Acompanhamento>
  {
    const apiUrl = `${this.url}/${acompanhamentoId}`;
    return this.https.get<Acompanhamento>(apiUrl);
  }

  obterAcompanhamentoPorGrupoIdPorEstudanteIdPorAtividadeIdJava(grupoId: number, estudanteId: number, atividadeId: number) {
    const apiUrl = `${this.javaUrl}/filtrarByGrupoIdByEstudanteIdByAtividadeId/${grupoId}/${estudanteId}/${atividadeId}`;
    return this.https.get<Acompanhamento>(apiUrl);
  }

  obterAcompanhamentoPorGrupoIdPorEstudanteIdPorObjetoIdJava(grupoId: number, estudanteId: number, objetoId: number) {
    const apiUrl = `${this.javaUrl}/filtrarByGrupoIdByEstudanteIdByObjetoId/${grupoId}/${estudanteId}/${objetoId}`;
    return this.https.get<Acompanhamento[]>(apiUrl);
  }

  NovoAcompanhamento(acompanhamento: Acompanhamento): Observable<any>{
    return this.https.post<any>(this.url, acompanhamento, httpOptions);
  }

  novoAcompanhamentoJava(acompanhamento: Acompanhamento): Observable<any>{
    const apiUrl = `${this.javaUrl}/simple`;
    return this.https.post<any>(apiUrl, acompanhamento);
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
