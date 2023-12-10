import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GrauDificuldade } from '../models/GrauDificuldade';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GrauDificuldadeService {

  javaUrl: string = 'http://localhost:8080/grau-dificuldade';
  constructor(
    private https: HttpClient
  ) { }

  ObterTodosJava() : Observable<GrauDificuldade[]>
  {
    return this.https.get<GrauDificuldade[]>(this.javaUrl);
  }
}
