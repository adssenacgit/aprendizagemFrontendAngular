import { Component, OnInit } from '@angular/core';
import { Curso } from 'src/app/models/Curso';
import { CursosService } from 'src/app/services/cursos.service';

@Component({
  selector: 'app-administrador-lista-cursos',
  templateUrl: './administrador-lista-cursos.component.html',
  styleUrls: ['./administrador-lista-cursos.component.css']
})
export class AdministradorListaCursosComponent implements OnInit {

  cursos: Curso[];

  loading: boolean = true;

  constructor(private cursosService: CursosService ) { }

  ngOnInit(): void {
    this.cursosService.ObterTodos().subscribe(resultado => {
      console.log(resultado);
      this.cursos = resultado;
      this.loading = false;
  });    
  }

}
