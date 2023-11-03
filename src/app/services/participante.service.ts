import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Participante } from '../models/Participante';

@Injectable({
  providedIn: 'root'
})
export class ParticipanteService {


  javaUrl = 'http://localhost:8080/participante';

  constructor(
    private http: HttpClient
  ) { }

  obterParticipantesPorGrupoIdJava(grupoId: number) {
    const apiUrl = `${this.javaUrl}/filtrar-participantes-por-grupo-id/${grupoId}`;
    return this.http.get<Participante[]>(apiUrl);
  }
}
