import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ChapterAssunto } from '../models/ChapterAssunto';
import { ChapterTag } from '../models/ChapterTag';


const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type' : 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('TokenUsuarioLogado')}`
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ChapterAssuntoService {
  url:string = environment.apiServer + 'api/ChapterAssunto';
  javaUrl: string = 'http://localhost:8080/chapter-assunto';


  constructor(private https: HttpClient) { }

  ObterTodos() : Observable<ChapterAssunto[]>
  {
    return this.https.get<ChapterAssunto[]>(this.url);
  }

  ObterTodosJava() : Observable<ChapterAssunto[]>
  {
    return this.https.get<ChapterAssunto[]>(this.javaUrl);
  }

  ObterTodosComTotalComentariosJava() : Observable<ChapterAssunto[]>
  {
    const apiUrl = `${this.javaUrl}/with-total-comentarios`;
    return this.https.get<ChapterAssunto[]>(apiUrl);
  }

  ObterChapterAssuntoWithComentariosPaiByIdJava(chapterAssuntoId: number) : Observable<ChapterAssunto>
  {
    const apiUrl = `${this.javaUrl}/${chapterAssuntoId}/with-comentarios-pai`;
    return this.https.get<ChapterAssunto>(apiUrl);
  }

  ObterChapterAssuntoById (chapterAssuntoId: number) : Observable<ChapterAssunto>
  {
    const apiUrl = `${this.url}/${chapterAssuntoId}`;
    return this.https.get<ChapterAssunto>(apiUrl);
  }

  ObterNoticiasJava() : Observable<ChapterAssunto[]>
  {
    const apiUrl = `${this.javaUrl}/noticias`;
    return this.https.get<ChapterAssunto[]>(apiUrl);
  }

  ObterChapterAssuntoByIdJava (chapterAssuntoId: number) : Observable<ChapterAssunto>
  {
    const apiUrl = `${this.javaUrl}/${chapterAssuntoId}`;
    return this.https.get<ChapterAssunto>(apiUrl);
  }

  ObterChapterAssuntoWithTotalComentariosByIdJava (chapterAssuntoId: number) : Observable<ChapterAssunto>
  {
    const apiUrl = `${this.javaUrl}/${chapterAssuntoId}/with-total-comentarios`;
    return this.https.get<ChapterAssunto>(apiUrl);
  }

  ObterChapterAssuntosByChapterId (chapterId: number): Observable<ChapterAssunto[]> {
    const apiUrl = `${this.url}/filterByChapterId/${chapterId}`;
    return this.https.get<ChapterAssunto[]>(apiUrl);
  }

  ObterChapterAssuntosByChapterIdJava (chapterId: number): Observable<ChapterAssunto[]> {
    const apiUrl = `${this.javaUrl}/filtrar-chapter-assuntos-por-chapter-id/${chapterId}`;
    return this.https.get<ChapterAssunto[]>(apiUrl);
  }



  NovoChapterAssunto (chapterAssunto: ChapterAssunto): Observable<any>
  {
    return this.https.post<ChapterAssunto>(this.url, chapterAssunto, httpOptions);
  }

  NovoChapterAssuntoJava (chapterAssunto: ChapterAssunto): Observable<any>
  {
    return this.https.post<ChapterAssunto>(this.javaUrl, chapterAssunto);
  }

  AtualizarChapterAssunto(chapterId: number, chapter: ChapterAssunto):Observable<any>
  {
    const apiUrl = `${this.url}/${chapterId}`;
    return this.https.put<ChapterAssunto>(apiUrl, chapter, httpOptions);
  }

  ExcluirChapterAssunto(cursoId: number): Observable<any>
  {
    const apiUrl = `${this.url}/${cursoId}`;
    return this.https.delete<ChapterAssunto>(apiUrl, httpOptions);
  }

  FiltrarChapterAssunto(descricaoAssunto: string) : Observable<ChapterAssunto[]>
  {
    const apiUrl = `${this.url}/FiltrarChapterAssunto${descricaoAssunto}`;
    return this.https.get<ChapterAssunto[]>(apiUrl);
  }

  AssociarTagsChapterAssuntoJava(chapterAssuntoId: number, chapterTags: ChapterTag[]): Observable<any>
  {
    const apiUrl = `${this.javaUrl}/${chapterAssuntoId}/associar-tags`;
    return this.https.post<ChapterAssunto>(apiUrl, chapterTags, httpOptions);
  }


  getComentariosPaginados(page: number, size: number): Observable<ChapterAssunto[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.https.get<ChapterAssunto[]>(`${this.javaUrl}/paginados`, { params });
  }
}
