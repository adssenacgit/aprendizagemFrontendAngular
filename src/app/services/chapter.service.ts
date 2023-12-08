import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
import { Chapter } from '../models/Chapter';

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type' : 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('TokenUsuarioLogado')}`
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ChapterService {
  url:string = environment.apiServer + 'api/Chapter';
  javaUrl: string = 'http://localhost:8080/chapter'

  constructor(private https: HttpClient) { }


  ObterTodos() : Observable<Chapter[]>
  {
    return this.https.get<Chapter[]>(this.url);
  }

  ObterTodosJava() : Observable<Chapter[]>
  {
    return this.https.get<Chapter[]>(this.javaUrl);
  }

  ObterChapterById (chapterId: number) : Observable<Chapter>
  {
    const apiUrl = `${this.url}/${chapterId}`;
    return this.https.get<Chapter>(apiUrl);
  }

  ObterChapterByGrupoIdJava (grupoId: number) : Observable<Chapter>
  {
    const apiUrl = `${this.javaUrl}/getChapterByGrupoId/${grupoId}`;
    return this.https.get<Chapter>(apiUrl);
  }

  NovoChapter (chapter: Chapter): Observable<any>
  {
    return this.https.post<Chapter>(this.url, chapter, httpOptions);
  }

  AtualizarChapter(chapterId: number, chapter: Chapter):Observable<any>
  {
    const apiUrl = `${this.url}/${chapterId}`;
    return this.https.put<Chapter>(apiUrl, chapter, httpOptions);
  }

  ExcluirChapter(chapterId: number): Observable<any>
  {
    const apiUrl = `${this.url}/${chapterId}`;
    return this.https.delete<Chapter>(apiUrl, httpOptions);
  }

  FiltrarChapter(nomeCurso: string) : Observable<Chapter[]>
  {
    const apiUrl = `${this.url}/FiltrarChapter${nomeCurso}`;
    return this.https.get<Chapter[]>(apiUrl);
  }
}
