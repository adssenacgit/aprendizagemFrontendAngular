import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Progresso } from '../models/Progresso';

@Injectable({
  providedIn: 'root'
})
export class ProgressoService {

  javaUrl = 'http://localhost:8080/progresso';

  constructor(
    private http: HttpClient
  ) { }

  obterProgressoByGrupoIdByEstudanteId(grupoId: number, estudanteId: number): Observable<Progresso> {
    const apiUrl = `${this.javaUrl}/${grupoId}/${estudanteId}`;
    return this.http.get<Progresso>(apiUrl);
  }

}
