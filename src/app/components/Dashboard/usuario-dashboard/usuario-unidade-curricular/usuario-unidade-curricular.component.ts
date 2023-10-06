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
  planejamentoUc: PlanejamentoUC;
  isLoading: boolean = true;

  constructor(
    private authGuardService : AuthGuardService,
    private route : ActivatedRoute,
    private grupoService: GrupoService,
    private encontroService: EncontroService,
    private planejamentoUcService: PlanejamentoUcService,
    private situacaoApredizagemService: SituacaoAprendizagemService,
    ) { }



  async ngOnInit(): Promise<void> {
    this.grupoId = this.route.snapshot.params['id'];
    this.estudanteId = this.authGuardService.getIdEstudanteUsuarioLogado();
    try {
      this.grupoService.ObterGrupoPeloId(this.grupoId)
        .subscribe({
          next: (response) => {
            this.grupo = response;
          }
        });
      this.encontroService.ObterEncontroPorGrupoIdPorEstudanteId(this.grupoId, this.estudanteId)
        .subscribe({
          next: (response) => {
            this.encontros = response;
            this.encontros.forEach((encontro, index) => {
              this.situacaoApredizagemService.FiltrarSituacoesAprendizagemPorEncontroId(encontro.id).subscribe({
                next: (response) => {
                  encontro.situacoesAprendizagem = response;
                  this.encontros[index] = encontro;
                  encontro.situacoesAprendizagem.forEach((situacao, index2) => {
                    this.situacaoApredizagemService.filtrarAtividadesEObjetosBySituacaoAprendizagemId(situacao.id)
                      .subscribe({
                        next: (response) => {
                          this.encontros[index].situacoesAprendizagem[index2] = response;
                        }
                      })
                  })



                }
              })
            })
          }
        });
        this.planejamentoUcService.FiltrarPlanejamentoUCByGrupoId(this.grupoId)
        .subscribe({
          next: (response) => {
            this.planejamentoUc = response;
          }
        });
    } finally {
        this.isLoading = false
      }
  }


}
