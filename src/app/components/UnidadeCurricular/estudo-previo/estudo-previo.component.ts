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
  visible: boolean;
  loading: boolean = true;
  selectedFile: File | null;
  // files: Set<File>;
  file: File;
  uintArrayFile: Uint8Array;
  idEstudanteUsuarioLogado: number;
  idAtividade: number;
  teste: string;
  inscricao: Subscription;
  atividades: Atividade[];
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

      }
    )
  }

  comecarAtividade() {
    this.router.navigate(['/cursos/atividades/' + this.situacaoAprendizagem.id])
  }

  obterAtividade = () => {
    this.atividadeService.FiltrarAtividadebySituacaoAprendizagemId(this.idAtividade)
      .subscribe((resultado) => {
        this.atividades = resultado;
        console.log(this.atividades);
      });
  };

  // onFileSelected($event: any) {
  //   const selectedFile = $event.target.files;
  //   const fileName = [];
  //   this.files = new Set();
  //   for (let index = 0; index < selectedFile.length; index++) {
  //     fileName.push(selectedFile[index].name);
  //     this.files.add(selectedFile[index]);
  //   }
  //   fileName.join(", ");
  //   console.log($event.target.files);
  // }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.convertToBinaryAndSave(file);
  }

  convertToBinaryAndSave(file: File) {
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryString: string | ArrayBuffer | null = reader.result;
      const uintArray = new Uint8Array(binaryString as ArrayBuffer);
      // Enviar os dados binários para o servidor
      this.uintArrayFile = uintArray;
      this.enviarArquivo();
    };
    reader.readAsArrayBuffer(file);
  }

  enviarArquivo() {
    if (this.uintArrayFile !== null) {
      this.atividadeService.CadastrarAtividade(this.uintArrayFile, this.idAtividade, this.idEstudanteUsuarioLogado)
        .subscribe(() => { console.log("Upload concluído!") });
    }
  }


  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }

}
