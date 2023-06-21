import { Injectable } from '@angular/core';
import { ChapterAssuntoComentario } from 'src/app/models/ChapterAssuntoComentario';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  url = environment.apiServer + 'api/ChapterAssuntoComentario';
  constructor(private https: HttpClient) { }

  FiltrarChapterAssuntoComentarioPorId (id: number) : Observable<ChapterAssuntoComentario[]>
  {
    const apiUrl = `${this.url}/filterByChapterAssuntoId/${id}`;
    let teste = this.https.get<ChapterAssuntoComentario[]>(apiUrl)
    return teste;
  }
}