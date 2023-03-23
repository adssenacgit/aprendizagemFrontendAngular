import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Atividade } from 'src/app/models/Atividade';
import { SituacaoAprendizagem } from 'src/app/models/SituacaoAprendizagem';
import { UnidadeCurricular } from 'src/app/models/UnidadeCurricular';
import { AtividadeService } from 'src/app/services/atividade.service';
import { EstudoPrevioService } from 'src/app/services/estudo-previo.service';
import { UnidadeCurricularService } from 'src/app/services/unidade-curricular.service';

@Component({
  selector: 'app-estudo-previo',
  templateUrl: './estudo-previo.component.html',
  styleUrls: ['./estudo-previo.component.css']
})

export class EstudoPrevioComponent implements OnInit {
    loading: boolean= true;
    constructor(private router: Router,
      private route: ActivatedRoute,
      private estudoPrevioService : EstudoPrevioService,
      private atividadeService: AtividadeService) {
    }
    teste : string;
    ngOnInit(): void {
      this.situacaoId = this.route.snapshot.params['id'];
      // this.situacaoId = 1;
      this.estudoPrevioService.ObterSituacaoAprendizagem(this.situacaoId).subscribe(resultado => {
        this.situacaoAprendizagem = resultado;
        
        this.atividadeService.ObterAtividadePorSituacaoId(this.situacaoAprendizagem.id).subscribe(atv =>{
          this.atividades = atv;
        })
        this.atividadeService.formatarAtividades(this.atividades).then(atv => {
          this.atividades = atv;
        })
      })
      this.loading = false;
      this.teste = "teste"
    }
    atividades : Atividade[] = []
    situacaoId : number;
    situacaoAprendizagem : SituacaoAprendizagem;
  
    comecarAtividade(){
      
      this.router.navigate(['/cursos/atividades/'+this.situacaoAprendizagem.id])
    }
  }