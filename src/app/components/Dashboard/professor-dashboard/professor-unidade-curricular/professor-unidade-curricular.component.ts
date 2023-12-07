import { SituacaoAprendizagem } from './../../../../models/SituacaoAprendizagem';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Badge } from 'src/app/models/Badge';
import { Encontro } from 'src/app/models/Encontro';
import { Grupo } from 'src/app/models/Grupo';
import { PlanejamentoUC } from 'src/app/models/PlanejamentoUC';
import { Progresso } from 'src/app/models/Progresso';
import { BadgeService } from 'src/app/services/badge.service';
import { EncontroService } from 'src/app/services/encontro.service';
import { GrupoService } from 'src/app/services/grupo.service';
import { PlanejamentoUcService } from 'src/app/services/planejamento-uc.service';
import { SituacaoAprendizagemService } from 'src/app/services/situacaoaprendizagem.service';

@Component({
  selector: 'app-professor-unidade-curricular',
  templateUrl: './professor-unidade-curricular.component.html',
  styleUrls: ['./professor-unidade-curricular.component.css']
})
export class ProfessorUnidadeCurricularComponent implements OnInit {

  isLoading: boolean = true;
  grupoId: number;
  planejamentoUc: PlanejamentoUC
  grupo: Grupo;
  encontros: Encontro[]
  situacoesAprendizagem: SituacaoAprendizagem[]
  badges: Badge[];
  progresso: Progresso;

  constructor(
    private route : ActivatedRoute,
    private encontroService: EncontroService,
    private planejamentoUcService: PlanejamentoUcService,
    private grupoService: GrupoService,
    private situacaoAprendizagemService: SituacaoAprendizagemService,
    private badgeService: BadgeService,
  ) { }

  ngOnInit(): void {
    try {
      this.grupoId = this.route.snapshot.params['id'];
      this.grupoService.setGrupoId(this.grupoId);
      this.grupoService.ObterGrupoPeloId(this.grupoId)
          .subscribe({
            next: (response) => {
              this.grupo = response;
            }
          });
      this.badgeService.ObterBadgesPeloGrupoId(this.grupoId)
      .subscribe({
        next: (response) => this.badges = response
      })
      this.planejamentoUcService.FiltrarPlanejamentoUCByGrupoId(this.grupoId)
        .subscribe({
          next: response => this.planejamentoUc = response,
          complete: () => {
            this.situacaoAprendizagemService.filtrarSituacoesAprendizagemPorPlanejamentoUcIdJava(this.planejamentoUc.id)
            .subscribe({
              next: response => this.situacoesAprendizagem = response
            })

          }
        })
      this.encontroService.ObterEncontroPorGrupoIdJava(this.grupoId)
        .subscribe({
          next: response => {this.encontroService.setEncontros(response);}
        })
    } finally {
      this.isLoading = false;
    }


  }

}
