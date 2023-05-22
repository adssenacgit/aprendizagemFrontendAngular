import { Component, OnInit } from '@angular/core';
import { RegistroAvaliacao } from 'src/app/models/RegistroAvaliacao';
import { Grupo } from 'src/app/models/Grupo';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { RegistroAvaliacaoService } from 'src/app/services/registro-avaliacao.service';
import { GrupoService } from 'src/app/services/grupo.service';
import { Acompanhamento } from 'src/app/models/Acompanhamento';
import { AcompanhamentoService } from 'src/app/services/acompanhamento.service';



@Component({
  selector: 'app-conceitos-feedbacks',
  templateUrl: './usuario-conceitos-feedbacks.component.html',
  styleUrls: ['./usuario-conceitos-feedbacks.component.css'],
  
})


  



export class UsuarioConceitosFeedbacksComponent implements OnInit {
  
  grupos: Grupo[];
  registrosAvaliacao: RegistroAvaliacao[];
  registrosAvaliacaoAtual : {[key: string] : RegistroAvaliacao[]} = {};
  loading: boolean = true;
  idEstudanteUsuarioLogado : number;
  AcompanhamentoComentariosService: any;
  acompanhamento: Acompanhamento[] = [];
    
   
  
  visible: boolean;

    showDialog() {
        this.visible = true;
    }
    
  constructor(
    private registroAvaliacaoService : RegistroAvaliacaoService, 
    private grupoService: GrupoService,
    private AcompanhamentoService: AcompanhamentoService,
    private authGuardService: AuthGuardService,

  ) 
  { }

  ngOnInit(): void {
    
    /*this.AcompanhamentoComentariosService.obterTodos().subscribe((t ) => {
      this.acompanhamentoComentario = t
      console.log(t) 
    } )*/

    this.idEstudanteUsuarioLogado = this.authGuardService.getIdEstudanteUsuarioLogado();

    this.grupoService.ObterGrupoPeloEstudanteIdSemestreAtivo(this.idEstudanteUsuarioLogado).subscribe(resultado => {
      this.grupos = resultado;
      this.grupos.forEach(grupo => 
        this.registroAvaliacaoService.ObterRegistrosPeriodoAtivoFilterByEstudanteIdByGrupoId(this.idEstudanteUsuarioLogado, grupo.id).subscribe(resultado =>{
          this.registrosAvaliacaoAtual[grupo.unidadeCurricular.nomeCurto]=resultado;

          //  O Valor de grupoId esta mocado devido a Ids 8 e 7, passados pelo forEach, não estarem vinculados a um Acompanhamento, contudo o endpoint funciona perfeitamente
        this.AcompanhamentoService.ObterAcompanhamentoPorGrupoIdeEstudanteId(grupo.id,this.idEstudanteUsuarioLogado).subscribe(resultado =>{
          // em caso de teste o hard log deve apresentar lista vazia [], exceto para grupo.id = 1
        console.log(resultado)
        this.acompanhamento=resultado;




        })
        })
        )
      this.loading = false;

      });





      this.loading = false;
    };

    // this.registroAvaliacaoService.ObterRegistrosPeriodoAtualFilterByUsuarioId(this.idUsuarioLogado).subscribe(resultado => {
    //   this.registrosAvaliacao = resultado;
    //   this.loading = false;
    // });
    //console.log(this.registrosAvaliacaoAtual);
    //console.log(this.idUsuarioLogado);
  }
  

