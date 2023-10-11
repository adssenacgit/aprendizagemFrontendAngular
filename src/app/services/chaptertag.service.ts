import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
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
export class ChapterTagService {
  url:string = environment.apiServer + 'api/ChapterTag';

  constructor(private https: HttpClient) { }

  ObterTodos() : Observable<ChapterTag[]>
  {
    return this.https.get<ChapterTag[]>(this.url);
  }

  ObterChapterTagById (tagId: number) : Observable<ChapterTag>
  {
    const apiUrl = `${this.url}/${tagId}`;
    return this.https.get<ChapterTag>(apiUrl);
  }

  NovoChapterTag(chapterTag: ChapterTag): Observable<any>
  {
    return this.https.post<ChapterTag>(this.url, chapterTag, httpOptions);
  }

  AtualizarChapterTag(tagId: number, chapterTag: ChapterTag):Observable<any>
  {
    const apiUrl = `${this.url}/${tagId}`;
    return this.https.put<ChapterTag>(apiUrl, chapterTag, httpOptions);
  }

  ExcluirChapterTagById(tagId: number): Observable<any>
  {
    const apiUrl = `${this.url}/${tagId}`;
    return this.https.delete<ChapterTag>(apiUrl, httpOptions);
  }

  FiltrarChapterTagByChapterAssuntoId(chapterAssuntoID: number) : Observable<ChapterTag[]>
  {
    const apiUrl = `${this.url}/FilterChapterTagByChapterAssuntoId/${chapterAssuntoID}`;
    return this.https.get<ChapterTag[]>(apiUrl);
  }
}
