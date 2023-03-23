import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Curso } from '../models/Curso';

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type' : 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('TokenUsuarioLogado')}`
  }),
};

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  url:string = environment.apiServer + 'api/Curso';

  constructor(private https: HttpClient) { }

  ObterTodos() : Observable<Curso[]>
  {
    return this.https.get<Curso[]>(this.url);
  }

  ObterCursoById (cursoId: number) : Observable<Curso>
  {
    const apiUrl = `${this.url}/${cursoId}`;
    return this.https.get<Curso>(apiUrl);
  }

  NovoCurso (curso: Curso): Observable<any>
  {
    return this.https.post<Curso>(this.url, curso, httpOptions);
  }

  AtualizarCurso(cursoId: number, curso: Curso):Observable<any>
  {
    const apiUrl = `${this.url}/${cursoId}`;
    return this.https.put<Curso>(apiUrl, curso, httpOptions);
  }

  ExcluirCurso(cursoId: number): Observable<any>
  {
    const apiUrl = `${this.url}/${cursoId}`;
    return this.https.delete<Curso>(apiUrl, httpOptions);
  }

  FiltrarCursos(nomeCurso: string) : Observable<Curso[]>
  {
    const apiUrl = `${this.url}/FiltrarCursos/${nomeCurso}`;
    return this.https.get<Curso[]>(apiUrl);
  }
}
