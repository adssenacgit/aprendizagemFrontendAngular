import { GrupoService } from 'src/app/services/grupo.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Grupo } from 'src/app/models/Grupo';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { Encontro } from 'src/app/models/Encontro';
import { EncontroService } from 'src/app/services/encontro.service';
import { PlanejamentoUC } from 'src/app/models/PlanejamentoUC';
import { PlanejamentoUcService } from 'src/app/services/planejamento-uc.service';

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

  constructor(
    private authGuardService : AuthGuardService,
    private route : ActivatedRoute,
    private grupoService: GrupoService,
    private encontroService: EncontroService,
    private planejamentoUcService: PlanejamentoUcService
    ) { }



  ngOnInit(): void {
    this.grupoId = this.route.snapshot.params['id'];
    this.estudanteId = this.authGuardService.getIdEstudanteUsuarioLogado();
    this.grupoService.ObterGrupoPeloId(this.grupoId)
      .subscribe({
        next: (response) => {
          this.grupo = response;
          console.log(this.grupo);
        }
      });
    this.encontroService.ObterEncontroPorGrupoIdPorEstudanteId(this.grupoId, this.estudanteId)
      .subscribe({
        next: (response) => {
          this.encontros = response;
        }
      });
      this.planejamentoUcService.FiltrarPlanejamentoUCByGrupoId(this.grupoId)
      .subscribe({
        next: (response) => {
          this.planejamentoUc = response;
        }
      });
  }


}
