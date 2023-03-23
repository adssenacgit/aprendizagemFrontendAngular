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

  FiltrarCompetenciaIndicadoresByUnidadeCurricularId(ucId: number): Observable<CompetenciaIndicador[]>
  {
    const apiUrl = `${this.url}/FiltrarCompetenciaIndicadoresByUnidadeCurricularId/${ucId}`;
    return this.https.get<CompetenciaIndicador[]>(apiUrl);
  }
}
