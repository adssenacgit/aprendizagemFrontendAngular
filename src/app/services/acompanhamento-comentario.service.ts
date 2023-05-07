import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { get } from 'http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AcompanhamentoComentarios } from '../models/acompanhamento-comentarios';


@Injectable({
  
  providedIn: 'root'
})
export class AcompanhamentoComentarioService {

  url = environment.apiServer + 'api/Atividade';
  constructor(private https: HttpClient) { }
  obterTodos(): Observable<any> {
    return this.https.get<AcompanhamentoComentarios[]>(this.url)
  


  }
}