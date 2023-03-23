import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SenacCoinMovimentacao } from '../models/SenacCoinMovimentacao';

const httpOptions ={
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
    'Authorization' : `Bearer ${localStorage.getItem('TokeUsuarioLogado')}`
  }),
}

@Injectable({
  providedIn: 'root'
})
export class SenacCoinMovimentacaoService {
  apiUrl = environment.apiServer + 'api/SenacCoinMovimentacao';

  constructor(private http: HttpClient) { }

  ObterSenacCoinMovimentacaoPeloId(id : number): Observable<SenacCoinMovimentacao>
  {
    const apiUrl = `${this.apiUrl}/${id}`;
    return this.http.get<SenacCoinMovimentacao>(apiUrl);
  }

  ObterSenacCoinMovimentacaoPeloUsuarioId(id : string): Observable<SenacCoinMovimentacao[]>
  {
    const apiUrl = `${this.apiUrl}/FilterByUsuarioId/${id}`;
    return this.http.get<SenacCoinMovimentacao[]>(apiUrl);
  }

}