import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Oferta } from '../models/Oferta';

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('TokeUsuarioLogado')}`,
    }),
  };

@Injectable({
  providedIn: 'root'
})
export class OfertasService {

  url = environment.apiServer + 'api/Oferta';
  constructor(private https: HttpClient) { }

  ObterOfertasPeloCursoId (cursoId: number) : Observable<Oferta[]>
  {
    const apiUrl = `${this.url}/ObterOfertasPeloCursoId/${cursoId}`;
    return this.https.get<Oferta[]>(apiUrl);
  }

  ObterOfertasPeloId(ofertaId: number): Observable<Oferta>
  {
    const apiUrl = `${this.url}/${ofertaId}`;
    return this.https.get<Oferta>(apiUrl);
  }

  NovaOferta(oferta: Oferta): Observable<any>{
    return this.https.post<Oferta>(this.url, oferta, httpOptions);
  }

  AtualizarOferta(ofertaId: number, oferta: Oferta): Observable<any>{
    const apiUrl = `${this.url}/${ofertaId}`;
    return this.https.put<Oferta>(apiUrl, oferta, httpOptions);
  }

  ExcluirOferta(ofertaId: number): Observable<any>{
    const apiUrl = `${this.url}/${ofertaId}`;
    return this.https.delete<Oferta>(apiUrl, httpOptions);    
  }

  FiltrarOferta(nomeOferta: string) : Observable<Oferta[]>
  {
    const apiUrl = `${this.url}/FiltrarOferta/${nomeOferta}`;
    return this.https.get<Oferta[]>(apiUrl);
  }

}
