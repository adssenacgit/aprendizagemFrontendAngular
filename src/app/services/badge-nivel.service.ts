import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BadgeNivel } from '../models/BadgeNivel';

@Injectable({
  providedIn: 'root'
})
export class BadgeNivelService {
  url:string = environment.apiServer + 'api/BadgeNivel';

  constructor(private https: HttpClient) { }

  ObterTodos(): Observable<BadgeNivel[]>
  {
    return this.https.get<BadgeNivel[]>(this.url);
  }
}
