import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import { SenacCoin } from '../models/SenacCoin';

const httpOptions ={
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
    'Authorization' : `Bearer ${localStorage.getItem('TokeUsuarioLogado')}`
  }),
}
@Injectable({
  providedIn: 'root'
})
export class SenacCoinService {

  apiUrl = environment.apiServer + 'api/SenacCoin';

  constructor(private http: HttpClient) { }

  ObterSenacCoinPeloId(id : number): Observable<SenacCoin>
  {
    const apiUrl = `${this.apiUrl}/${id}`;
    return this.http.get<SenacCoin>(apiUrl);
  }

  ObterSenacCoinPeloUsuarioId(id : string): Observable<SenacCoin>
  {
    const apiUrl = `${this.apiUrl}/FiltrarSenacCoinByUsuarioId/${id}`;
    return this.http.get<SenacCoin>(apiUrl);
  }  
}