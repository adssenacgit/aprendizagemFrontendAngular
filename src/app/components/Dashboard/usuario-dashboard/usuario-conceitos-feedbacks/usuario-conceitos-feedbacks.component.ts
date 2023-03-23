import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistroAvaliacao } from 'src/app/models/RegistroAvaliacao';
import { Grupo } from 'src/app/models/Grupo';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { RegistroAvaliacaoService } from 'src/app/services/registro-avaliacao.service';
import { GrupoService } from 'src/app/services/grupo.service';


@Component({
  selector: 'app-conceitos-feedbacks',
  templateUrl: './usuario-conceitos-feedbacks.component.html',
  styleUrls: ['./usuario-conceitos-feedbacks.component.css']
})
export class UsuarioConceitosFeedbacksComponent implements OnInit {

  grupos: Grupo[];
  registrosAvaliacao: RegistroAvaliacao[];
  registrosAvaliacaoAtual : {[key: string] : RegistroAvaliacao[]} = {};
  loading: boolean = true;
  idUsuarioLogado : string;

  constructor(
    private registroAvaliacaoService : RegistroAvaliacaoService, 
    private grupoService: GrupoService,
    private authGuardService: AuthGuardService
  ) 
  { }

  ngOnInit(): void {
    this.idUsuarioLogado = this.authGuardService.getIdUsuarioLogado();

    this.grupoService.ObterGrupoPeloUsuarioIdSemestreAtivo(this.idUsuarioLogado).subscribe(resultado => {
      this.grupos = resultado;
      this.grupos.forEach(grupo => 
        this.registroAvaliacaoService.ObterRegistrosPeriodoAtivoFilterByUsuarioIdByGrupoId(this.idUsuarioLogado, grupo.id).subscribe(resultado =>{
          this.registrosAvaliacaoAtual[grupo.unidadeCurricular.nomeCurto]=resultado;
        })
        )
      this.loading = false;
    });
    // this.registroAvaliacaoService.ObterRegistrosPeriodoAtualFilterByUsuarioId(this.idUsuarioLogado).subscribe(resultado => {
    //   this.registrosAvaliacao = resultado;
    //   this.loading = false;
    // });
    //console.log(this.registrosAvaliacaoAtual);
    //console.log(this.idUsuarioLogado);
  }

}