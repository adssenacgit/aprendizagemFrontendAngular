import { EncontroStatus } from './../models/EncontroStatus';
import { Encontro } from './../models/Encontro';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, switchMap } from 'rxjs';
import { environment } from 'src/environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('TokeUsuarioLogado')}`,
  }),
};

@Injectable({
  providedIn: 'root',
})
export class EncontroService {
  url = environment.apiServer + 'api/Encontro';
  javaUrl = 'http://localhost:8080/encontro'

  constructor(private https: HttpClient) {}

  ObterEncontros(): Observable<Encontro[]> {
    const apiUrl = `${this.url}`;
    return this.https.get<Encontro[]>(apiUrl);
  }

  ObterEncontroPorId(encontroId: Encontro['id']): Observable<Encontro> {
    const apiUrl = `${this.url}/${encontroId}`;
    return this.https.get<Encontro>(apiUrl);
  }

  ObterEncontroPorGrupoIdPorEstudanteId(grupoId: number, estudanteId: number): Observable<Encontro[]> {
    const apiUrl = `${this.url}/FilterByGrupoIdByEstudanteId/${grupoId}/${estudanteId}`;
    return this.https.get<Encontro[]>(apiUrl);
  }

  ObterEncontroPorGrupoIdJava(grupoId: number): Observable<Encontro[]> {
    const apiUrl = `${this.javaUrl}/filtrarByGrupoId/${grupoId}`;
    return this.https.get<Encontro[]>(apiUrl);
  }

  NovoEncontro(encontro: Encontro): Observable<Encontro> {
    return this.https.post<Encontro>(this.url, encontro, httpOptions);
  }

  AtualizarEncontro(
    encontroId: Encontro['id'],
    encontro: Encontro
  ): Observable<Encontro> {
    const apiUrl = `${this.url}/${encontroId}`;
    return this.https.put<Encontro>(apiUrl, encontro, httpOptions);
  }

  ExcluirEncontro(encontroId: Encontro['id']): Observable<Encontro> {
    const apiUrl = `${this.url}/${encontroId}`;
    return this.https.delete<Encontro>(apiUrl, httpOptions);
  }

  FiltarEncontroPelaData(
    dataEncontro: Encontro['horaFim']
  ): Observable<Encontro> {
    const apiUrl = `${this.url}/FiltrarEncontro/${dataEncontro}`;
    return this.https.get<Encontro>(apiUrl, httpOptions);
  }

  ObterStatusDoEncontro(idEncontro:number, idUsuario: string): Observable<EncontroStatus> {
    const apiUrl = `${this.url}/ObterStatusEncontro/${idEncontro}/${idUsuario}`;
    return this.https.get<EncontroStatus>(apiUrl, httpOptions);
  }

  private encontroSource = new BehaviorSubject<Encontro[]>([])
  currentData = this.encontroSource.asObservable();
  setEncontros(data: Encontro[]) {
    this.encontroSource.next(data);
  }
}
