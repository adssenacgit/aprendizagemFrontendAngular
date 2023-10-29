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

  totalSituacoesAprendizagem: number = 0;
  totalObjetosAprendizagem: number = 0;
  totalAtividades: number = 0;
  totalSituacoesAprendizagemAcompanhadas: number = 0;
  totalObjetosAprendizagemAcompanhadas: number = 0;
  totalAtividadesAcompanhadas: number = 0;
  progressoUC: number = 0;
  progressoAluno: number = 0;

  constructor(
    private authGuardService : AuthGuardService,
    private route : ActivatedRoute,
    private grupoService: GrupoService,
    private encontroService: EncontroService,
    private planejamentoUcService: PlanejamentoUcService,
    private situacaoAprendizagemService: SituacaoAprendizagemService,
    private badgeService: BadgeService,
    private acompanhamentoService: AcompanhamentoService
    ) { }



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
      this.encontroService.ObterEncontroPorGrupoIdJava(this.grupoId)
        .subscribe({
          next: (response) => {
            this.encontros = response;
            this.encontroService.setEncontros(this.encontros);
          }
        });
      // this.encontroService.ObterEncontroPorGrupoIdPorEstudanteId(this.grupoId, this.estudanteId)
      //   .subscribe({
      //     next: (response) => {
      //       this.encontros = response;
      //       this.encontros.forEach((encontro, index) => {
      //         this.situacaoAprendizagemService.FiltrarSituacoesAprendizagemPorEncontroId(encontro.id).subscribe({
      //           next: (response) => {
      //             encontro.situacoesAprendizagem = response;
      //             this.encontros[index] = encontro;
      //             encontro.situacoesAprendizagem.forEach((situacao, index2) => {
      //               this.situacaoAprendizagemService.filtrarAtividadesEObjetosBySituacaoAprendizagemId(situacao.id)
      //                 .subscribe({
      //                   next: (response) => {
      //                     this.encontros[index].situacoesAprendizagem[index2] = response;
      //                   }
      //                 })
      //             })
      //           }
      //         });
      //         this.encontroService.setEncontros(this.encontros);
      //         this.totalSituacoesAprendizagem += encontro.encontroStatus.totalSituacaoAprendizagem;
      //         this.totalObjetosAprendizagem += encontro.encontroStatus.totalObjetoAprendizagem;
      //         this.totalAtividades += encontro.encontroStatus.totalAtividade;
      //         this.totalSituacoesAprendizagemAcompanhadas += encontro.encontroStatus.totalSituacaoAprendizagemAcompanhadas;
      //         this.totalObjetosAprendizagemAcompanhadas += encontro.encontroStatus.totalObjetoAprendizagemAcompanhadas;
      //         this.totalAtividadesAcompanhadas += encontro.encontroStatus.totalAtividadeAcompanhadas;
      //       })
      //       let temp = 0
      //       temp += this.totalSituacoesAprendizagem + this.totalObjetosAprendizagem + this.totalAtividades
      //       console.log(temp)
      //       this.progressoUC = Math.round((temp / temp) * 100)
      //       this.progressoAluno = Math.round(((this.totalSituacoesAprendizagemAcompanhadas + this.totalObjetosAprendizagemAcompanhadas + this.totalAtividadesAcompanhadas) / this.progressoUC) * 100)
      //     }
      //   });
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
    } finally {
        this.isLoading = false;
      }
  }


}
