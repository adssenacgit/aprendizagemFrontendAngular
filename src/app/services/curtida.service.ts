import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  constructor(private https: HttpClient) {}

  ObterTodos(): Observable<Curtida[]> {
    return this.https.get<Curtida[]>(this.url);
  }

  FiltrarCurtidaByChapterAssuntoComentarioId(
    id: number
  ): Observable<Curtida[]> {
    const apiUrl = `${this.url}/FiltrarCurtidaByChapterAssuntoComentarioId/${id}`;
    return this.https.get<Curtida[]>(apiUrl);
  }
}
