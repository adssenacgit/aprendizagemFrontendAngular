import { Component, OnInit } from '@angular/core';
import { catchError, delay, of } from 'rxjs';
import { Modulo } from 'src/app/models/Modulo';
import { SenacCoinMovimentacao } from 'src/app/models/SenacCoinMovimentacao';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { ModuloService } from 'src/app/services/modulo.service';
import { UnidadeCurricularService } from 'src/app/services/unidade-curricular.service';
import { ErrorService } from 'src/app/shared/alerts/error-dialog/error-dialog.service';

@Component({
  selector: 'app-usuario-noticias',
  templateUrl: './usuario-noticias.component.html',
  styleUrls: ['./usuario-noticias.component.css']
})
export class UsuarioNoticiasComponent {

  constructor(
  ) { }

}
