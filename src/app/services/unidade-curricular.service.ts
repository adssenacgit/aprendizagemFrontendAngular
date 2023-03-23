import { UnidadeCurricular } from './../models/UnidadeCurricular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('TokeUsuarioLogado')}`,
    }),
  };

@Injectable({
  providedIn: 'root'
})
export class UnidadeCurricularService {

  url = environment.apiServer + 'api/UnidadeCurricular';
  constructor(private https: HttpClient) { }

  ObterUnidadeCurricularPeloId(ucId: number): Observable<UnidadeCurricular>
  {
    const apiUrl = `${this.url}/${ucId}`;
    return this.https.get<UnidadeCurricular>(apiUrl);
  }

  ObterUnidadeCurricularPelaOfertaId (ofertaId: number) : Observable<UnidadeCurricular[]>
  {
    const apiUrl = `${this.url}/filterByOferta/${ofertaId}`;
    return this.https.get<UnidadeCurricular[]>(apiUrl);
  }

  ObterUnidadeCurricularPeloModuloId (moduloId: number) : Observable<UnidadeCurricular[]>
  {
    const apiUrl = `${this.url}/filterByModulo/${moduloId}`;
    return this.https.get<UnidadeCurricular[]>(apiUrl);
  }

  // ObterUnidadeCurricularPeloUsuarioIdSemestreAtual (id: string) : Observable<UnidadeCurricular[]>
  // {
  //   const apiUrl = `${this.url}/filterByUsuarioIdSemestreAtual/${id}`;
  //   return this.https.get<UnidadeCurricular[]>(apiUrl);
  // }

  // ObterUnidadeCurricularPeloUsuarioId (id: string, idPeriodo: number) : Observable<UnidadeCurricular[]>
  // {
  //   const apiUrl = `${this.url}/filterByUsuarioId/${id}/${idPeriodo}`;
  //   return this.https.get<UnidadeCurricular[]>(apiUrl);
  // }

  NovaUnidadeCurricular(uc: UnidadeCurricular): Observable<any>{
    return this.https.post<UnidadeCurricular>(this.url, uc, httpOptions);
  }

  AtualizarUnidadeCurricular(ucId: number, uc: UnidadeCurricular): Observable<any>{
    const apiUrl = `${this.url}/${ucId}`;
    return this.https.put<UnidadeCurricular>(apiUrl, uc, httpOptions);
  }

  ExcluirUnidadeCurricular(ucId: number): Observable<any>{
    const apiUrl = `${this.url}/${ucId}`;
    return this.https.delete<UnidadeCurricular>(apiUrl, httpOptions);    
  }

  FiltrarUnidadeCurricular(nomeUc: string, idOferta: number) : Observable<UnidadeCurricular[]>
  {
    const apiUrl = `${this.url}/FiltrarUnidadeCurricular/${idOferta}/${nomeUc}`;
    return this.https.get<UnidadeCurricular[]>(apiUrl);
  }

}
