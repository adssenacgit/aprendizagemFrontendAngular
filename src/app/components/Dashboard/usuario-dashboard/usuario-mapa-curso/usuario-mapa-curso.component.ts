import { Component, OnInit } from '@angular/core';
import { catchError, delay, of } from 'rxjs';
import { Modulo } from 'src/app/models/Modulo';
import { SenacCoinMovimentacao } from 'src/app/models/SenacCoinMovimentacao';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { ModuloService } from 'src/app/services/modulo.service';
import { UnidadeCurricularService } from 'src/app/services/unidade-curricular.service';
import { ErrorService } from 'src/app/shared/alerts/error-dialog/error-dialog.service';

@Component({
  selector: 'app-usuario-mapa-curso',
  templateUrl: './usuario-mapa-curso.component.html',
  styleUrls: ['./usuario-mapa-curso.component.css']
})
export class UsuarioMapaCursoComponent implements OnInit {

  loading: boolean = true;
  senacCoinMovimentacoes: SenacCoinMovimentacao[];
  idEstudanteUsuarioLogado: number;
  modulos: Modulo[];

  constructor(
    private authGuardService: AuthGuardService,
    private unidadeCurricularService: UnidadeCurricularService,
    private errorService: ErrorService,
    private moduloService: ModuloService,
  ) { }

  ngOnInit(): void {

    this.idEstudanteUsuarioLogado = this.authGuardService.getIdEstudanteUsuarioLogado();

    this.ObterModulos();

  }

  ObterModulos = () => {
    this.moduloService.ObterModulosPorEstudanteId(this.idEstudanteUsuarioLogado).pipe(
      delay(500),
      catchError((error) => {
        this.errorService.onError('Erro ao carregar unidades curriculares.');
        return of([]);
      })
    ).subscribe((resultadoUnidadesCurriculares) => {
      this.modulos = resultadoUnidadesCurriculares;
      console.log(this.idEstudanteUsuarioLogado)
      console.log(this.modulos)
    });
  }

}
