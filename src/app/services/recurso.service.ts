import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Recurso } from '../models/Recurso';

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('TokeUsuarioLogado')}`,
    }),
};

@Injectable({
  providedIn: 'root'
})

export class RecursoService {

  apiUrl = environment.apiServer + 'api/Recurso';
  javaUrl = 'http://localhost:8080/recurso';

  constructor(private http: HttpClient) { }

  ObterTodos() : Observable<Recurso[]>
  {
    return this.http.get<Recurso[]>(this.apiUrl, httpOptions);
  }

  ObterRecursoPeloUsuarioId(id : string): Observable<Recurso[]>
  {
    const apiUrl = `${this.apiUrl}/FiltrarRecursosByUsuarioId/${id}`;
    return this.http.get<Recurso[]>(apiUrl);
  }

  AtualizarRecurso(id:number, recurso: Recurso): Observable<Recurso> {
    return this.http.put<Recurso>((`${this.apiUrl}/${id}`),recurso);
  }

  SalvarRecurso(recurso: Recurso): Observable<Recurso> {
    const apiUrl = `${this.apiUrl}`;
    return this.http.post<Recurso>(apiUrl, recurso, httpOptions);
  }

  DeletarRecurso(id: number): Observable<Recurso> {
    const apiUrl = `${this.apiUrl}/${id}`;
    return this.http.delete<Recurso>(apiUrl, httpOptions);
  }

  ObterRecursoPorId(id: number): Observable<Recurso> {
    const apiUrl = `${this.apiUrl}/${id}`;
    return this.http.get<Recurso>(apiUrl, httpOptions);
  }

  ObterArquivoRecursoPorIdJava(id: number): Observable<Blob> {
    const apiUrl = `${this.javaUrl}/arquivoRecursoById/${id}`;
    return this.http.get<Blob>(apiUrl, {
      responseType: 'blob' as 'json'
    });
  }

  ObterRecursoPeloUsuarioIdJava(id : string): Observable<Recurso[]>
  {
    const apiUrl = `${this.javaUrl}/filtrarRecursosByUsuarioId/${id}`;
    return this.http.get<Recurso[]>(apiUrl);
  }

  ObterRecursoPublicosJava() {
    const apiUrl = `${this.javaUrl}/filtrarRecursosPublicos/`;
    return this.http.get<Recurso[]>(apiUrl);
  }

  ObterRecursoPorIdJava(id: number): Observable<Recurso> {
    const apiUrl = `${this.javaUrl}/${id}`;
    return this.http.get<Recurso>(apiUrl);
  }

  AtualizarRecursoStatusJava(id: number, statusAtualizado: number) {
    const apiUrl = `${this.javaUrl}/atualizarRecursoStatus/${id}/${statusAtualizado}`;
    return this.http.put<Recurso>(apiUrl, statusAtualizado);
  }

  AtualizarRecursoNomeJava(id: number, nomeAtualizado: string) {
    const apiUrl = `${this.javaUrl}/atualizarRecursoNome/${id}/`;
    return this.http.put<Recurso>(apiUrl, nomeAtualizado);
  }
}
