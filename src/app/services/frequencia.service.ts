import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FrequenciaViewModel } from '../models/FrequenciaViewModel';

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('TokeUsuarioLogado')}`,
    }),
  };

@Injectable({
  providedIn: 'root'
})
export class FrequenciaService {
  ///api/Frequencia/obterFrequenciaByGrupoIdByEstudanteId/{idGrupo}/{idEstudante}
  url = environment.apiServer + 'api/Frequencia';
  constructor(private https: HttpClient) { }

  ObterFrequenciaByGrupoIdByEstudanteId(grupoId: number, estudanteId: number): Observable<FrequenciaViewModel>
  {
    const apiUrl = `${this.url}/obterFrequenciaByGrupoIdByEstudanteId/${grupoId}/${estudanteId}`;
    return this.https.get<FrequenciaViewModel>(apiUrl);
  }
}
