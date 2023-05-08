import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Comentario }from  '../models/comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  comentarios: Comentario[] = [
    {
      id: 1,
      nome: "João",
      comentario: "Comentario 1",
      data: "2023-05-07",
      pergunta: "Pergunta 1 "
    },
    {
      id: 2,
      nome: "Maria",
      comentario: "Comentario 2",
      data: "2023-05-06",
      pergunta: "Pergunta 2 "
    },
    {
      id: 3,
      nome: "Pedro",
      comentario: "Comentario 3",
      data: "2023-05-05",
      pergunta: "Pergunta 3 ",
    }
  ];

  getComentarios(): Observable<Comentario[]> {
    return of(this.comentarios);
  }

  constructor() { }
}
