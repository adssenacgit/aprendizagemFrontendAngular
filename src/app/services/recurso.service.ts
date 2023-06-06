import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

}