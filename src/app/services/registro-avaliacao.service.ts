import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RegistroAvaliacao } from '../models/RegistroAvaliacao';


const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('TokenUsuarioLogado')}`,
    }),
  };

@Injectable({
  providedIn: 'root'
})
export class RegistroAvaliacaoService {

  url = environment.apiServer + 'api/RegistroAvaliacao';

  constructor(private https: HttpClient) { }

  SalvarRegistroAvaliacao (registroAvaliacao: RegistroAvaliacao) : Observable<RegistroAvaliacao> {
    const apiUrl = `${this.url}`;
    return this.https.post<RegistroAvaliacao>(apiUrl, registroAvaliacao, httpOptions);
  }

  ObterRegistrosAvaliacaoPeloEstudanteId (estudanteId: number) : Observable<RegistroAvaliacao[]> {
    const apiUrl = `${this.url}/TodosRegistrosFilterByEstudanteId/${estudanteId}`;
    return this.https.get<RegistroAvaliacao[]>(apiUrl);
  }

  ObterRegistrosPeriodoAtivoFilterByEstudanteId(estudanteId: number) : Observable<RegistroAvaliacao[]>{
    const apiUrl = `${this.url}/TodosRegistrosPeriodoAtivoFilterByEstudanteId/${estudanteId}`;
    return this.https.get<RegistroAvaliacao[]>(apiUrl);
  }

  ObterRegistrosPeriodoAtivoFilterByEstudanteIdByGrupoId(estudanteId: number, grupoId: number) : Observable<RegistroAvaliacao[]>{
    const apiUrl = `${this.url}/TodosRegistrosPeriodoAtivoFilterByEstudanteIdByGrupoId/${estudanteId}/${grupoId}`;
    return this.https.get<RegistroAvaliacao[]>(apiUrl);
  }
}
