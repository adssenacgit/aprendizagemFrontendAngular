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

  constructor(private https: HttpClient) {}

  TotalFilterByChapterAssuntoComentarioId(
    ComentarioId: number
  ): Observable<number> {
    const apiUrl = `${this.url}/TotalFilterByChapterAssuntoComentarioId/${ComentarioId}`;
    return this.https.get<number>(apiUrl);
  }
}
