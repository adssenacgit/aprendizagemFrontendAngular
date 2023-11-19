import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CompetenciaIndicador } from '../models/CompetenciaIndicador';

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('TokeUsuarioLogado')}`,
    }),
  };

@Injectable({
  providedIn: 'root'
})
export class CompetenciaIndicadorService {
  url = environment.apiServer + 'api/CompetenciaIndicador';
  constructor(private https: HttpClient) { }

  listarTodasCompetenciasIndicador(): Observable<CompetenciaIndicador[]> {
    return this.https.get<CompetenciaIndicador[]>(this.url);
  }

  criarCompetenciaIndicador(competenciaIndicador: CompetenciaIndicador): Observable<CompetenciaIndicador> {
    return this.https.post<CompetenciaIndicador>(this.url, competenciaIndicador);
  }

  obterCompetenciaIndicadorPorId(id: number): Observable<CompetenciaIndicador> {
    return this.https.get<CompetenciaIndicador>(`${this.url}/${id}`);
  }

  atualizarCompetenciaIndicador(id: number, competenciaIndicador: CompetenciaIndicador): Observable<CompetenciaIndicador> {
    return this.https.put<CompetenciaIndicador>(`${this.url}/${id}`, competenciaIndicador);
  }

  excluirCompetenciaIndicador(id: number): Observable<void> {
    return this.https.delete<void>(`${this.url}/${id}`);
  }

  FiltrarCompetenciaIndicadoresByUnidadeCurricularId(ucId: number): Observable<CompetenciaIndicador[]>
  {
    const apiUrl = `${this.url}/FiltrarCompetenciaIndicadoresByUnidadeCurricularId/${ucId}`;
    return this.https.get<CompetenciaIndicador[]>(apiUrl);
  }

  FiltrarCompetenciaIndicadoresByDescricao(descricao: string): Observable<CompetenciaIndicador[]>
  {
    const apiUrl = `${this.url}/FiltrarCompetenciaIndicadores/${descricao}`;
    return this.https.get<CompetenciaIndicador[]>(apiUrl);
  }
}
