import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { Component, OnInit } from '@angular/core';
import { Grupo } from 'src/app/models/Grupo';
import { GrupoService } from 'src/app/services/grupo.service';

@Component({
  selector: 'app-usuario-lista-uc',
  templateUrl: './usuario-lista-uc.component.html',
  styleUrls: ['./usuario-lista-uc.component.css']
})
export class UsuarioListaUcComponent implements OnInit {

  grupos: Grupo[];

  loading: boolean = true;

  idEstudanteUsuarioLogado : number;

  constructor(private grupoService: GrupoService, 
              private authGuardService: AuthGuardService) { }

  ngOnInit(): void {
    this.idEstudanteUsuarioLogado = this.authGuardService.getIdEstudanteUsuarioLogado();
    this.grupoService.ObterGrupoPeloEstudanteIdSemestreAtivo(this.idEstudanteUsuarioLogado).subscribe(resultado => {
      this.grupos = resultado;      
      this.loading = false;
    });    
  }
}
