import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CursoTipo } from '../models/CursoTipo';

@Injectable({
  providedIn: 'root'
})
export class CursoTiposService {
  url:string = environment.apiServer + 'api/CursoTipo';

  constructor(private https: HttpClient) { }

  ObterTodos(): Observable<CursoTipo[]>
  {
    return this.https.get<CursoTipo[]>(this.url);
  }
}
