import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DiaLetivo } from '../models/DiaLetivo';

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type' : 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('TokenUsuarioLogado')}`
  }),
};

@Injectable({
  providedIn: 'root'
})
export class DiaLetivoService {
  url:string = environment.apiServer + 'api/DiaLetivo';

  constructor(private https: HttpClient) { }

  ObterTodosByPeriodoId(periodoId: number) : Observable<DiaLetivo[]>
  {
    const apiUrl = `${this.url}/ListarDiasPeriodo/${periodoId}`;
    return this.https.get<DiaLetivo[]>(this.url);
  }

  ObterCalendarioSemestreAtualByUsuarioId (usuarioId: string) : Observable<DiaLetivo[]>
  {
    const apiUrl = `${this.url}/FiltrarDiasLetivosByUsuarioId/${usuarioId}`;
    return this.https.get<DiaLetivo[]>(apiUrl);
  }

  NovoDiaLetivo (diaLetivo: DiaLetivo): Observable<any>
  {
    return this.https.post<DiaLetivo>(this.url, diaLetivo, httpOptions);
  }

  AtualizarDiaLetivo(diaLetivoId: number, diaLetivo: DiaLetivo):Observable<any>
  {
    const apiUrl = `${this.url}/${diaLetivoId}`;
    return this.https.put<DiaLetivo>(apiUrl, diaLetivo, httpOptions);
  }

  ExcluirDiaLetivo(diaLetivoId: number): Observable<any>
  {
    const apiUrl = `${this.url}/${diaLetivoId}`;
    return this.https.delete<DiaLetivo>(apiUrl, httpOptions);
  }

  FiltrarCursos(data: string) : Observable<DiaLetivo[]>
  {
    const apiUrl = `${this.url}/FiltrarDiaLetivo/${data}`;
    return this.https.get<DiaLetivo[]>(apiUrl);
  }
}
