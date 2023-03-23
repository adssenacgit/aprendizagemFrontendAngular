import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SituacaoAprendizagem } from '../models/SituacaoAprendizagem';

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type' : 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('TokenUsuarioLogado')}`
  }),
};

@Injectable({
  providedIn: 'root'
})
export class EstudoPrevioService {
  url:string = environment.apiServer + 'api/SituacaoAprendizagem';

  constructor(private https: HttpClient) { }

  ObterSituacaoAprendizagem (situacaoId: number) : Observable<SituacaoAprendizagem>
  {
    const apiUrl = `${this.url}/${situacaoId}`
    return this.https.get<SituacaoAprendizagem>(apiUrl);
  }
}