import { AcompanhamentoService } from 'src/app/services/acompanhamento.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Encontro } from 'src/app/models/Encontro';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { GrupoService } from 'src/app/services/grupo.service';
import { Grupo } from 'src/app/models/Grupo';


@Component({
  selector: 'app-lista-encontros',
  templateUrl: './encontros.component.html',
  styleUrls: ['./encontros.component.css']
})
export class EncontrosListaComponent implements OnInit{


  @Input()
  encontros: Encontro[];
  estudanteId: number;
  isLoading: boolean = true;
  grupoId: number

  constructor(
    private authGuardService: AuthGuardService,
    private acompanhamentoService: AcompanhamentoService,
    private grupoService: GrupoService
  ) { }

  ngOnInit(): void {
    console.log(this.encontros)
    this.estudanteId = this.authGuardService.getIdEstudanteUsuarioLogado()
    this.grupoId = this.grupoService.getGrupoId()

  }

  obterAcompanhamento(encontro: Encontro) {
    encontro.situacoesAprendizagem.forEach ((situacao) => {
      situacao.atividades?.forEach((atividade) => {
        this.acompanhamentoService.obterAcompanhamentoPorGrupoIdPorEstudanteIdPorAtividadeIdJava(this.grupoId, this.estudanteId, atividade.id)
          .subscribe({
            next: (response) => {
              response != null ? atividade.cursado = true : atividade.cursado = false;
            }
          })
      })
      situacao.objetosAprendizagem?.forEach((objeto) => {
        this.acompanhamentoService.obterAcompanhamentoPorGrupoIdPorEstudanteIdPorObjetoIdJava(this.grupoId, this.estudanteId, objeto.id)
          .subscribe({
            next: (response) => {
              response != null ? objeto.cursado = true : objeto.cursado = false;
            }
          })
      })
    })
  }
}
