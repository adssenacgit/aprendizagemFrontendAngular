import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { RegistroAvaliacao } from 'src/app/models/RegistroAvaliacao';
import { Grupo } from 'src/app/models/Grupo';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { RegistroAvaliacaoService } from 'src/app/services/registro-avaliacao.service';
import { GrupoService } from 'src/app/services/grupo.service';
import { AcompanhamentoService } from 'src/app/services/acompanhamento.service';
import { Acompanhamento } from 'src/app/models/Acompanhamento';


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
  idEstudanteUsuarioLogado : number;
  dialogVisible = false;
  acompanhamento: Acompanhamento[] = [];
  selectedComentario: string;

  
  constructor(
    private registroAvaliacaoService : RegistroAvaliacaoService, 
    private acompanhamentoService : AcompanhamentoService,
    private grupoService: GrupoService,
    private authGuardService: AuthGuardService
  ) 
  { }

  ngOnInit(): void {
    
    this.idEstudanteUsuarioLogado = this.authGuardService.getIdEstudanteUsuarioLogado();

    this.grupoService.ObterGrupoPeloEstudanteIdSemestreAtivo(this.idEstudanteUsuarioLogado).subscribe(resultado => {
      this.grupos = resultado;
      this.grupos.forEach(grupo => 
        this.registroAvaliacaoService.ObterRegistrosPeriodoAtivoFilterByEstudanteIdByGrupoId(this.idEstudanteUsuarioLogado, grupo.id).subscribe(resultado =>{
          this.registrosAvaliacaoAtual[grupo.unidadeCurricular.nomeCurto]=resultado;

          this.acompanhamentoService.ObterAcompanhamentoPeloGrupoIdPeloEstudanteId(grupo.id,this.idEstudanteUsuarioLogado).subscribe(resultado =>{
            // em caso de teste o hard log deve apresentar lista vazia [], exceto para grupo.id = 1
          console.log(resultado)
          this.acompanhamento=resultado;  
  
          })

        })
        )
      this.loading = false;
    });
  }

  showDialog(comentario: string) {
    this.dialogVisible = true;
    this.selectedComentario = comentario;
    this.dialogVisible = true;
  }

}