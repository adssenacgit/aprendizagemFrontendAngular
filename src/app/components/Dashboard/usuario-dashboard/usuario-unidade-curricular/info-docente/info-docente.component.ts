import { UsuariosService } from 'src/app/services/usuarios.service';
import { Component, Input, OnInit } from '@angular/core';
import { Professor } from 'src/app/models/Professor';
import { Usuario } from 'src/app/models/Usuario';

@Component({
  selector: 'app-info-docente',
  templateUrl: './info-docente.component.html',
  styleUrls: ['./info-docente.component.css']
})
export class InfoDocenteComponent implements OnInit {

  @Input() professor: Professor;
  professorUsuario: Usuario;

  constructor(
    private usuarioService: UsuariosService
  ) { }

  ngOnInit(): void {
    this.usuarioService.ObterUsuarioPorId(this.professor.usuarioId)
      .subscribe({
        next: (response) => {
          this.professorUsuario = response;
        }
      })
  }

}
