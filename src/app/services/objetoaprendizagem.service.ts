import { Encontro } from './../models/Encontro';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ObjetoAprendizagem } from '../models/ObjetoAprendizagem';


const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('TokeUsuarioLogado')}`,
    }),
  };

@Injectable({
  providedIn: 'root'
})
export class ObjetoAprendizagemService {

  url = environment.apiServer + 'api/ObjetoAprendizagem';
  constructor(private https: HttpClient) { }

  FiltrarObjetoAprendizagemPorSituacaoAprendizagemId (id: number) : Observable<ObjetoAprendizagem[]>
  {
    const apiUrl = `${this.url}/FiltrarObjetoAprendizagemBySituacaoAprendizagemId/${id}`;
    return this.https.get<ObjetoAprendizagem[]>(apiUrl);
  }

  FiltrarObjetoAprendizagemPorIndicadorCompetenciaId(id: number): Observable<ObjetoAprendizagem[]> {
		const apiUrl = `${this.url}/FiltrarObjetoAprendizagemByIndicadorCompetenciaId/${id}`;
		return this.https.get<ObjetoAprendizagem[]>(apiUrl);
	}
}
