import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { Component, OnInit } from '@angular/core';
import { Grupo } from 'src/app/models/Grupo';
import { GrupoService } from 'src/app/services/grupo.service';
import { ProfessorService } from 'src/app/services/professor.service';

@Component({
  selector: 'app-professor-lista-uc',
  templateUrl: './professor-lista-uc.component.html',
  styleUrls: ['./professor-lista-uc.component.css']
})
export class ProfessorListaUcComponent implements OnInit {

  grupos: Grupo[];

  loading: boolean = true;

  idProfessorLogado: number;
  usuarioIdLogado: string;

  constructor(private grupoService: GrupoService,
              private authGuardService: AuthGuardService,
              private professorService: ProfessorService) { }

  ngOnInit(): void {
    this.usuarioIdLogado = this.authGuardService.getIdUsuarioLogado();
    this.professorService.obterProfessorPorUsuarioIdJava( this.usuarioIdLogado)
      .subscribe(
        response => {
          this.idProfessorLogado = response.id
        }
      )
    this.grupoService.obterGruposPeloProfessorIdPeriodoAtivo(1).subscribe(resultado => {
      this.grupos = resultado;
      this.loading = false;
    });
  }
}
