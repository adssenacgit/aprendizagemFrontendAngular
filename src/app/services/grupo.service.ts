import { Grupo } from './../models/Grupo';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';


const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('TokeUsuarioLogado')}`,
    }),
  };

@Injectable({
  providedIn: 'root'
})
export class GrupoService {

  url = environment.apiServer + 'api/Grupo';
  javaUrl = 'http://localhost:8080/grupo'
  grupoId: number;
  constructor(private https: HttpClient) { }

  ObterGrupoPeloId(ucId: number): Observable<Grupo>
  {
    const apiUrl = `${this.url}/${ucId}`;
    return this.https.get<Grupo>(apiUrl);
  }

//   ObterGrupoPelaOfertaId (ofertaId: number) : Observable<Grupo[]>
//   {
//     const apiUrl = `${this.url}/filterByOferta/${ofertaId}`;
//     return this.https.get<Grupo[]>(apiUrl);
//   }

//   ObterGrupoPeloModuloId (moduloId: number) : Observable<Grupo[]>
//   {
//     const apiUrl = `${this.url}/filterByModulo/${moduloId}`;
//     return this.https.get<Grupo[]>(apiUrl);
//   }

  ObterGrupoPeloEstudanteIdSemestreAtivo (estudanteId: number) : Observable<Grupo[]>
  {
    const apiUrl = `${this.url}/ObterGruposByPeriodoAtivoByEstudanteId/${estudanteId}`;
    return this.https.get<Grupo[]>(apiUrl);
  }

  ObterTodosGrupos () : Observable<Grupo[]>
  {
    const apiUrl = `${this.url}`;
    return this.https.get<Grupo[]>(apiUrl);
  }

  ObterGrupoPeloEstudanteIdPeriodoId (idEstudante: number, idPeriodo: number) : Observable<Grupo[]>
  {
    const apiUrl = `${this.url}/ObterGruposByEstudanteIdByPeriodoId/${idEstudante}/${idPeriodo}`;
    return this.https.get<Grupo[]>(apiUrl);
  }

  NovoGrupo(grupo: Grupo): Observable<any>{
    return this.https.post<Grupo>(this.url, grupo, httpOptions);
  }

  AtualizarGrupo(grupoId: number, grupo: Grupo): Observable<any>{
    const apiUrl = `${this.url}/${grupoId}`;
    return this.https.put<Grupo>(apiUrl, grupo, httpOptions);
  }

  ExcluirGrupo(grupoId: number): Observable<any>{
    const apiUrl = `${this.url}/${grupoId}`;
    return this.https.delete<Grupo>(apiUrl, httpOptions);
  }

  FiltrarGrupo(nomeUc: string, idOferta: number, idCurso: number) : Observable<Grupo[]>
  {
    const apiUrl = `${this.url}/FiltrarGrupo/${idCurso}/${idOferta}/${nomeUc}`;
    return this.https.get<Grupo[]>(apiUrl);
  }

  setGrupoId(grupoId: number): void {
    this.grupoId = grupoId;
  }

  getGrupoId() {
    return this.grupoId;
  }

  obterGruposPeloProfessorIdPeriodoAtivo(professorId: number) {
    const apiUrl = `${this.javaUrl}/getGrupoByPeriodoAtivoByProfessorId/${professorId}`;
    return this.https.get<Grupo[]>(apiUrl);
  }

}
