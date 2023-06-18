import { Component, OnInit } from '@angular/core';
import { Atividade } from 'src/app/models/Atividade';
import { UnidadeCurricular } from 'src/app/models/UnidadeCurricular';
import { AtividadeService } from 'src/app/services/atividade.service';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { EncontroService } from 'src/app/services/encontro.service';
import { PlanejamentoUcService } from 'src/app/services/planejamento-uc.service';
import { SituacaoAprendizagemService } from 'src/app/services/situacaoaprendizagem.service';
import { UnidadeCurricularService } from 'src/app/services/unidade-curricular.service';
import { EncontrosComponent } from '../encontros/encontros.component';
import { Encontro } from 'src/app/models/Encontro';
import { SituacaoAprendizagem } from 'src/app/models/SituacaoAprendizagem';

@Component({
  selector: 'app-atividades',
  templateUrl: './atividades.component.html',
  styleUrls: ['./atividades.component.css']
})
export class AtividadesComponent implements OnInit {

  idEstudanteUsuarioLogado : number;
  unidadesCurriculares: UnidadeCurricular[];
  moduloId: number = 0;
  atividades: Atividade[];
  encontros: Encontro[];
  situacoesAprendizagem: SituacaoAprendizagem[];
  loading: boolean = true;

  constructor(
    private unidadeCurricularService: UnidadeCurricularService,
    private authGuardService: AuthGuardService,
    private atividadeService: AtividadeService,
    private situacaoAprendizagemService: SituacaoAprendizagemService,
    private planejamentoUC: PlanejamentoUcService,
    private encontroService: EncontroService,
  ) { }

  ngOnInit(): void {
    this.idEstudanteUsuarioLogado = this.authGuardService.getIdEstudanteUsuarioLogado();
    this.obterUnidadesCurriculares();
    this.obterAtividades();
    this.obterEncontros();
    // this.obterSituacoesAprendizagem();
  }

  obterUnidadesCurriculares = () => {
    this.unidadeCurricularService.ObterUnidadeCurricularPeloModuloId(this.idEstudanteUsuarioLogado).subscribe((resultado) => {
      this.unidadesCurriculares = resultado;
      console.log(this.unidadesCurriculares);
    })
  }

  obterAtividades = () => {
    this.atividadeService.ObterAtividadesRecentesPeloUsuarioId("1").subscribe((resultado) => {
      this.atividades = resultado;
      console.log(this.atividades);
    })
  }

  obterEncontros(){
    this.encontroService.ObterEncontros().subscribe((resultado) => {
      this.encontros = resultado;
      console.log(this.encontros)
    })
  }

  // obterSituacoesAprendizagem = () => {
  //   this.situacaoAprendizagemService.FiltrarSituacoesAprendizagemPorEncontroId(1).subscribe((resultado) => {
  //     this.situacoesAprendizagem = resultado;
  //     console.log(this.situacoesAprendizagem);
  //   });
  // }

  // ObterAtividadesPorSituacaoPorUC = (idUnidadeCurricular: number, i: number) => {

  //   for(var j=0; j< this.situacoesAprendizagem.length; j=j+1){
  //     this.situacoesAprendizagem[j].selecionado=0;
  //   }

  //   this.situacoesAprendizagem[i].selecionado=1;
  //   this.loading = true;
  //   this.situacaoAprendizagemService.FiltrarSituacoesAprendizagemPorEncontroId(idUnidadeCurricular).subscribe((resultado) => {
  //     this.situacoesAprendizagem = resultado;
  //     console.log(this.situacoesAprendizagem);
  //     this.loading = false;
  //   });
  // }

}
