import { Injectable } from '@angular/core';
import { ChapterAssuntoComentario } from 'src/app/models/ChapterAssuntoComentario';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type' : 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('TokenUsuarioLogado')}`
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  url = environment.apiServer + 'api/ChapterAssuntoComentario';
  constructor(private https: HttpClient) { }

  ObterTodos():Observable<ChapterAssuntoComentario[]>{
    const apiUrl = `${this.url}`;
    let teste = this.https.get<ChapterAssuntoComentario[]>(apiUrl)
    return teste;
  }

  FiltrarChapterAssuntoComentarioPorId (id: number) : Observable<ChapterAssuntoComentario[]>
  {
    const apiUrl = `${this.url}/filterByChapterAssuntoId/${id}`;
    let teste = this.https.get<ChapterAssuntoComentario[]>(apiUrl)
    return teste;
  }

  NovoChapterAssuntoComentario (comentario: ChapterAssuntoComentario): Observable<ChapterAssuntoComentario>
  {
    return this.https.post<ChapterAssuntoComentario>(this.url, comentario, httpOptions);
  }
}
