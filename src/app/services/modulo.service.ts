import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Modulo } from '../models/Modulo';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('TokeUsuarioLogado')}`,
  }),
};

@Injectable({
  providedIn: 'root'
})
export class ModuloService {

  url = environment.apiServer + 'api/Modulo';

  constructor(private https: HttpClient) { }

  ObterModulos(): Observable<Modulo[]> {
    const apiUrl = `${this.url}`;
    return this.https.get<Modulo[]>(apiUrl);
  }

  ObterModulosPorEstudanteId(idEstudante: number): Observable<Modulo[]> {
    const apiUrl = `${this.url}/FiltrarModulosByEstudanteId/${idEstudante}`;
    return this.https.get<Modulo[]>(apiUrl);
  }

}