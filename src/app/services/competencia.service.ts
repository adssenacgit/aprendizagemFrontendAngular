import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UnidadeCurricular } from '../models/UnidadeCurricular';
import { Competencia } from '../models/Competencia';

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('TokeUsuarioLogado')}`,
    }),
  };

@Injectable({
  providedIn: 'root'
})
export class CompetenciaService {
  url = environment.apiServer + 'api/Competencia';
  constructor(private https: HttpClient) { }

  listarTodasCompetencias() : Observable<Competencia[]> {
    return this.https.get<Competencia[]>(this.url);
  }

  criarCompetencia(competencia: Competencia): Observable<Competencia> {
    return this.https.post<Competencia>(this.url, competencia);
  }

  obterCompetenciaPorId(id: number): Observable<Competencia> {
    return this.https.get<Competencia>(`${this.url}/${id}`);
  }

  atualizarCompetencia(id: number, competencia: Competencia): Observable<Competencia> {
    return this.https.put<Competencia>(`${this.url}/${id}`, competencia);
  }

  excluirCompetencia(id: number): Observable<void> {
    return this.https.delete<void>(`${this.url}/${id}`);
  }

  filterByUnidadeCurricularId(ucId: number): Observable<Competencia[]>
  {
    const apiUrl = `${this.url}/filterByUnidadeCurricular/${ucId}`;
    return this.https.get<Competencia[]>(apiUrl);
  }

  filterByDescription(description: string) : Observable<Competencia[]>
  {
    const apiUrl = `${this.url}/FiltrarCompetencias/${description}`;
    return this.https.get<Competencia[]>(apiUrl);
  }

}
