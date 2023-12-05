import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Professor } from '../models/Professor';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {

  javaUrl = 'http://localhost:8080/professor';

  constructor(
    private http: HttpClient
  ) { }

  obterProfessorPorUsuarioIdJava(usuarioId: string): Observable<Professor> {
    const apiUrl = `${this.javaUrl}/filtrar-professor-por-usuario-id/${usuarioId}`;
    return this.http.get<Professor>(apiUrl);
  }
}
