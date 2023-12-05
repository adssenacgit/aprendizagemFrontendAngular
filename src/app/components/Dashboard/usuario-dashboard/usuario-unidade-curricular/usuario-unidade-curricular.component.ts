import { AcompanhamentoService } from 'src/app/services/acompanhamento.service';
import { GrupoService } from 'src/app/services/grupo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Grupo } from 'src/app/models/Grupo';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { Encontro } from 'src/app/models/Encontro';
import { EncontroService } from 'src/app/services/encontro.service';
import { PlanejamentoUC } from 'src/app/models/PlanejamentoUC';
import { PlanejamentoUcService } from 'src/app/services/planejamento-uc.service';
import { SituacaoAprendizagemService } from 'src/app/services/situacaoaprendizagem.service';
import { BadgeService } from 'src/app/services/badge.service';
import { Badge } from 'src/app/models/Badge';
import { Acompanhamento } from 'src/app/models/Acompanhamento';
import { ObjetoAprendizagemService } from 'src/app/services/objetoaprendizagem.service';
import { DataService } from 'src/app/services/data-service.service';
import { ProgressoService } from 'src/app/services/progresso.service';
import { Progresso } from 'src/app/models/Progresso';

@Component({
  selector: 'app-usuario-unidade-curricular',
  templateUrl: './usuario-unidade-curricular.component.html',
  styleUrls: ['./usuario-unidade-curricular.component.css']
})
export class UsuarioUnidadeCurricularComponent implements OnInit {

  grupoId: number;
  estudanteId: number;
  grupo: Grupo;
  encontros: Encontro[];
  acompanhamentos: Acompanhamento[]
  badges: Badge[];
  planejamentoUc: PlanejamentoUC;
  isLoading: boolean = true;
  progresso: Progresso;

  constructor(
    private authGuardService : AuthGuardService,
    private route : ActivatedRoute,
    private grupoService: GrupoService,
    private encontroService: EncontroService,
    private planejamentoUcService: PlanejamentoUcService,
    private objetoAprendizagemService: ObjetoAprendizagemService,
    private dataService: DataService,
    private badgeService: BadgeService,
    private progressoService: ProgressoService,
    ) {
      this.objetoAprendizagemService.setObjetoSource(null)
      this.dataService.setDataSource(null)
    }



  async ngOnInit(): Promise<void> {
    this.grupoId = this.route.snapshot.params['id'];
    this.grupoService.setGrupoId(this.grupoId);

    this.estudanteId = this.authGuardService.getIdEstudanteUsuarioLogado();
    try {
      this.grupoService.ObterGrupoPeloId(this.grupoId)
        .subscribe({
          next: (response) => {
            this.grupo = response;
          }
        });
      this.encontroService.ObterEncontroPorGrupoIdPorEstudanteIdJava(this.grupoId, this.estudanteId)
        .subscribe({
          next: (response) => {
            this.encontroService.setEncontros(response);
          }
        });
      this.planejamentoUcService.FiltrarPlanejamentoUCByGrupoId(this.grupoId)
        .subscribe({
          next: (response) => {
            this.planejamentoUc = response;
          }
        });
      this.badgeService.ObterBadgesPeloGrupoId(this.grupoId)
        .subscribe({
          next: (res) => this.badges = res
        })
      this.progressoService.obterProgressoByGrupoIdByEstudanteId(this.grupoId, this.estudanteId)
        .subscribe({
          next: (res) => this.progresso = res
        })
    } finally {
        this.isLoading = false;
      }
  }
}
