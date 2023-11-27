import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
import {SenacCoinRecompensa} from "../models/SenacCoinRecompensa";

const httpOptions ={
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
    'Authorization' : `Bearer ${localStorage.getItem('TokeUsuarioLogado')}`
  }),
}
@Injectable({
  providedIn: 'root'
})
export class SenacCoinRecompensaService {

  apiUrl = environment.apiServer + 'api/SenacCoinRecompensa';

  constructor(private http: HttpClient) { }

  ObterSenacCoinRecompensas(): Observable<SenacCoinRecompensa[]>
  {
    const apiUrl = `${this.apiUrl}`;
    return this.http.get<SenacCoinRecompensa[]>(apiUrl);
  }
}
