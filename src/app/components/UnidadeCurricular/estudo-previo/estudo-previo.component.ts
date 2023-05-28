import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Atividade } from 'src/app/models/Atividade';
import { SituacaoAprendizagem } from 'src/app/models/SituacaoAprendizagem';
import { UnidadeCurricular } from 'src/app/models/UnidadeCurricular';
import { AtividadeService } from 'src/app/services/atividade.service';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { EstudoPrevioService } from 'src/app/services/estudo-previo.service';
import { SituacaoAprendizagemService } from 'src/app/services/situacaoaprendizagem.service';
import { UnidadeCurricularService } from 'src/app/services/unidade-curricular.service';

@Component({
  selector: 'app-estudo-previo',
  templateUrl: './estudo-previo.component.html',
  styleUrls: ['./estudo-previo.component.css']
})

export class EstudoPrevioComponent implements OnInit {
  loading: boolean = true;
  selectedFile: File | null;
  files: Set<File>;
  idEstudanteUsuarioLogado: number;
  idAtividade: number;
  teste: string;
  inscricao: Subscription;
  atividades: Atividade[];
  atividadeVerificacao: Atividade;
  idSituacao: number;
  situacaoAprendizagem: SituacaoAprendizagem;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private estudoPrevioService: EstudoPrevioService,
    private atividadeService: AtividadeService,
    private authGuardService: AuthGuardService,
    private situacaoAprendizagemService: SituacaoAprendizagemService,
  ) {
  }
  ngOnInit(): void {

    this.idEstudanteUsuarioLogado = this.authGuardService.getIdEstudanteUsuarioLogado();

    this.inscricao = this.route.params.subscribe(
      (params: any) => {
        this.idAtividade = params['id']

        this.obterAtividade();

        this.obterSituacaoAprendizagem();
      }
    )
  }

  comecarAtividade() {
    this.router.navigate(['/cursos/atividades/' + this.situacaoAprendizagem.id])
  }

  obterAtividade = () => {
    this.atividadeService.ObterAtividadePorSituacaoId(this.idAtividade)
      .subscribe((resultado) => {
        this.atividadeVerificacao = resultado;
        console.log(this.atividadeVerificacao);
      });
  };

  obterSituacaoAprendizagem = () => {
    this.situacaoAprendizagemService.ObterSituacaoAprendizagemPorId(this.idSituacao)
      .subscribe((resultado) => {
        this.situacaoAprendizagem = resultado;
        console.log(this.situacaoAprendizagem);
      });
  };

  onFileSelected($event: any) {
    const selectedFile = $event.target.files;
    const fileName = [];
    this.files = new Set();
    for (let index = 0; index < selectedFile.length; index++) {
      fileName.push(selectedFile[index].name);
      this.files.add(selectedFile[index]);
    }
    fileName.join(", ");
    console.log($event.target.files);
  }

  enviarArquivo() {
    if (this.files && this.files.size > 0) {
      this.atividadeService.CadastrarAtividade(this.files, this.idAtividade, this.idEstudanteUsuarioLogado)
        .subscribe(() => { console.log("Upload concluído!") });
    }
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }

}
