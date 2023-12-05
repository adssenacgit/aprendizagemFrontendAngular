import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Participante } from '../models/Participante';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticipanteService {


  javaUrl = 'http://localhost:8080/participante';

  constructor(
    private http: HttpClient
  ) { }

  obterParticipantesPorGrupoIdJava(grupoId: number): Observable<Participante[]> {
    const apiUrl = `${this.javaUrl}/filtrar-participantes-por-grupo-id/${grupoId}`;
    return this.http.get<Participante[]>(apiUrl);
  }

  obterParticipantePorEstudanteIdPorGrupoIdJava(estudanteId: number, grupoId: number): Observable<Participante>{
    const apiUrl = `${this.javaUrl}/filtrar-participante-por-estudante-id-por-grupo-id/${estudanteId}/${grupoId}`;
    return this.http.get<Participante>(apiUrl);
  }
}
