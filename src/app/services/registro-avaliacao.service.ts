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

  ObterRegistrosAvaliacaoPeloUsuarioId (id: string) : Observable<RegistroAvaliacao[]> {
    const apiUrl = `${this.url}/TodosRegistrosFilterByUsuarioId/${id}`;
    return this.https.get<RegistroAvaliacao[]>(apiUrl);
  }

  ObterRegistrosPeriodoAtivoFilterByUsuarioId(usuarioId: string) : Observable<RegistroAvaliacao[]>{
    const apiUrl = `${this.url}/TodosRegistrosPeriodoAtivoFilterByUsuarioId/${usuarioId}`;
    return this.https.get<RegistroAvaliacao[]>(apiUrl);
  }
  
  ObterRegistrosPeriodoAtivoFilterByUsuarioIdByGrupoId(usuarioId: string, grupoId: number) : Observable<RegistroAvaliacao[]>{
    const apiUrl = `${this.url}/TodosRegistrosPeriodoAtivoFilterByUsuarioIdByGrupoId/${usuarioId}/${grupoId}`;
    return this.https.get<RegistroAvaliacao[]>(apiUrl);
  }

}