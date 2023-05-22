import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Acompanhamento } from '../models/Acompanhamento';
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
export class AcompanhamentoService {

  url = environment.apiServer + 'api/Acompanhamento';

  constructor(private https: HttpClient) { }

  ObterAcompanhamentoPorGrupoIdeEstudanteId(grupoId: number, estudanteId: number) : Observable<Acompanhamento[]>{
    const apiUrl = `${this.url}/filterByBrupoIdByEstudanteId/${grupoId}/${estudanteId}`;
    return this.https.get<Acompanhamento[]>(apiUrl);
  }

}