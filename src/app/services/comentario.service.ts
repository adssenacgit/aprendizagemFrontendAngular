import { Injectable } from '@angular/core';
import { Comentario } from 'src/app/models/Comentario';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  url = environment.apiServer + 'api/ChapterAssuntoComentario';
  constructor(private https: HttpClient) { }

  FiltrarChapterAssuntoComentarioPorId (id: number) : Observable<Comentario[]>
  {
    const apiUrl = `${this.url}/filterByChapterAssuntoId/${id}`;
    let teste = this.https.get<Comentario[]>(apiUrl)
    return teste;
  }
}