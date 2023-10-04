import { Component, OnInit } from '@angular/core';
import { delay, catchError, of } from 'rxjs';
import { Modulo } from 'src/app/models/Modulo';
import { SenacCoin } from 'src/app/models/SenacCoin';
import { SenacCoinMovimentacao } from 'src/app/models/SenacCoinMovimentacao';
import { UnidadeCurricular } from 'src/app/models/UnidadeCurricular';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { ModuloService } from 'src/app/services/modulo.service';
import { SenacCoinMovimentacaoService } from 'src/app/services/senac-coin-movimentacao.service';
import { SenacCoinService } from 'src/app/services/senac-coin.service';
import { UnidadeCurricularService } from 'src/app/services/unidade-curricular.service';
import { ErrorService } from 'src/app/shared/alerts/error-dialog/error-dialog.service';

@Component({
  selector: 'app-trilha-curso',
  templateUrl: './usuario-trilha-curso.component.html',
  styleUrls: ['./usuario-trilha-curso.component.css']
})
export class UsuarioTrilhaCursoComponent implements OnInit {

  senacCoins : SenacCoin;
  loading: boolean = true;
  idEstudanteUsuarioLogado: number;
  modulos: Modulo[];

  constructor(
    private authGuardService: AuthGuardService,
    private unidadeCurricularService: UnidadeCurricularService,
    private errorService: ErrorService,
    private moduloService: ModuloService
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
