import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Curtida } from '../models/Curtida';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('TokenUsuarioLogado')}`,
  }),
};

@Injectable({
  providedIn: 'root',
})
export class CurtidaService {
  url: string = environment.apiServer + 'api/Curtida';
  javaUrl:string = "http://localhost:8080/curtida"

  constructor(private https: HttpClient) {}


  getAllCurtidas(): Observable<Curtida[]> {
    return this.https.get<Curtida[]>(this.url);
  }

  getCurtidaById(id: number): Observable<Curtida> {
    const apiUrl = `${this.url}/${id}`;
    return this.https.get<Curtida>(apiUrl);
  }

  getCurtidaByChapterAssuntoComentarioId(
    chapterAssuntoComentarioId: number
  ): Observable<Curtida[]> {
    const apiUrl = `${this.url}/FitrarCurtidaByChapterAssuntoComentarioId/${chapterAssuntoComentarioId}`;
    return this.https.get<Curtida[]>(apiUrl);
  }

  getCurtidaByUsuarioId(usuarioId: string): Observable<Curtida[]> {
    const apiUrl = `${this.url}/FilterCurtidaByUsuarioId/${usuarioId}`;
    return this.https.get<Curtida[]>(apiUrl);
  }

  postCurtida(curtida: Curtida): Observable<Curtida> {
    return this.https.post<Curtida>(this.url, curtida, httpOptions);
  }

  postCurtidaJava(curtida: Curtida): Observable<Curtida> {
    return this.https.post<Curtida>(this.javaUrl, curtida, httpOptions);
  }

  putCurtida(curtida: Curtida): Observable<Curtida> {
    return this.https.put<Curtida>(this.url, curtida, httpOptions);
  }

  deleteCurtida(curtidaId: number): Observable<Curtida> {
    const apiUrl = `${this.url}/${curtidaId}`;
    return this.https.delete<Curtida>(apiUrl, httpOptions);
  }


  totalFilterByChapterAssuntoComentarioId(ComentarioId: any): Observable<Curtida[]> {
    const apiUrl = `${this.url}/TotalFilterByChapterAssuntoComentarioId/${ComentarioId}`;
    return this.https.get<Curtida[]>(apiUrl);
  }

  filterCurtidaByComentarioIdByUsuarioId(ComentarioId: number, UsuarioId: string): Observable<Curtida>
  {
    const apiUrl = `${this.url}/FilterCurtidaByComentarioIdByUsuarioId/${ComentarioId}/${UsuarioId}`;
    return this.https.get<any>(apiUrl);
  }


}
