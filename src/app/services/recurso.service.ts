import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Recurso } from '../models/Recurso';
import { FormControl, FormGroup,Validators } from '@angular/forms';

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('TokeUsuarioLogado')}`,
    }),
};

@Injectable({
  providedIn: 'root'
})

export class RecursoService {

    apiUrl = environment.apiServer + 'api/Recurso';

  constructor(private http: HttpClient) { }

  ObterTodos() : Observable<Recurso[]>
  {
    return this.http.get<Recurso[]>(this.apiUrl, httpOptions);
  }

  ObterRecursoPeloUsuarioId(id : string): Observable<Recurso[]>
  {
    const apiUrl = `${this.apiUrl}/FiltrarRecursosByUsuarioId/${id}`;
    return this.http.get<Recurso[]>(apiUrl);
  }

  postar(formData:FormData): Observable<FormData> {
    return this.http.post<FormData>(this.apiUrl,formData);
  }


  


}