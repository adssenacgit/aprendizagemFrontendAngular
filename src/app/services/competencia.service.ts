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

  filterByUnidadeCurricularId(ucId: number): Observable<Competencia[]>
  {
    const apiUrl = `${this.url}/filterByUnidadeCurricular/${ucId}`;
    return this.https.get<Competencia[]>(apiUrl);
  }

}
