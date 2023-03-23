import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PlanejamentoUC } from '../models/PlanejamentoUC';

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('TokeUsuarioLogado')}`,
    }),
  };

@Injectable({
  providedIn: 'root'
})
export class PlanejamentoUcService {
  url = environment.apiServer + 'api/PlanejamentoUC';
    constructor(private https: HttpClient) { }

  FiltrarPlanejamentoUCByGrupoId(ucId: number): Observable<PlanejamentoUC>
  {
    const apiUrl = `${this.url}/FiltrarPlanejamentoUCByGrupoId/${ucId}`;
    return this.https.get<PlanejamentoUC>(apiUrl);
  }

  FiltrarPlanejamentoUCsByUnidadeCurricularId(ucId: number): Observable<PlanejamentoUC[]>
  {
    const apiUrl = `${this.url}/FiltrarPlanejamentoUCsByUnidadeCurricularId/${ucId}`;
    return this.https.get<PlanejamentoUC[]>(apiUrl);
  }


}
