import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bibliografia } from '../models/Bibliografia';

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('TokeUsuarioLogado')}`,
    }),
  };

@Injectable({
  providedIn: 'root'
})
export class BibliografiaService {
  url = environment.apiServer + 'api/Bibliografia';
  constructor(private https: HttpClient) { }

  FiltrarbibliografiaByUnidadeCurricularId(ucId: number): Observable<Bibliografia[]>
  {
    const apiUrl = `${this.url}/FiltrarbibliografiaByUnidadeCurricularId/${ucId}`;
    return this.https.get<Bibliografia[]>(apiUrl);
  }
}
