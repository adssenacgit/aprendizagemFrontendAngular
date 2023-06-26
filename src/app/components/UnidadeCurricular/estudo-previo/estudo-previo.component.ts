import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Atividade } from 'src/app/models/Atividade';
import { SituacaoAprendizagem } from 'src/app/models/SituacaoAprendizagem';
import { AtividadeService } from 'src/app/services/atividade.service';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { EstudoPrevioService } from 'src/app/services/estudo-previo.service';
import { SituacaoAprendizagemService } from 'src/app/services/situacaoaprendizagem.service';

@Component({
  selector: 'app-estudo-previo',
  templateUrl: './estudo-previo.component.html',
  styleUrls: ['./estudo-previo.component.css']
})

export class EstudoPrevioComponent implements OnInit {
  visible: boolean;
  loading: boolean = true;
  selectedFile: File | null;
  files: Set<File>;
  filesName: string[];
  uploadedFiles: File[];
  uintArrayFile: Uint8Array;
  idEstudanteUsuarioLogado: number;
  idAtividade: number;
  teste: string;
  inscricao: Subscription;
  atividade: Atividade;
  idSituacao: number;
  situacaoAprendizagem: SituacaoAprendizagem;
  atividadeTipoId: number;
  fileBlob: Blob;


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
        this.idAtividade = params['id'];
        this.obterAtividade();
      }
    )
  }

  obterAtividade = () => {
    this.atividadeService.ObterAtividadePorId(this.idAtividade)
      .subscribe((resultado) => {
        this.atividade = resultado;
        this.atividadeTipoId = this.atividade.atividadeTipo.id
        console.log(`Tipo da atividade: ${this.atividadeTipoId}`)
        console.log(this.atividade)
      });
  };

  onUpload(event: any) {
    for(let file of event.files) {
      this.uploadedFiles.push(file);
    }

}

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

  onFileSelected($event: any) {
    const selectedFile = $event.target.files;

    this.files = new Set();
    for (let index = 0; index < selectedFile.length; index++) {
      this.filesName.push(selectedFile[index].name);
      this.files.add(selectedFile[index]);
    }
    const file: File = $event.target.files[0];
    // this.convertToBinaryAndSave(file);
    console.log(file)
    this.convertToFileBlob(file);
  }

  // convertToBinaryAndSave(file: File) {
  //   const reader = new FileReader();
  //   reader.onload = (event) => {
  //     const binaryString: string | ArrayBuffer | null = reader.result;
  //     const uintArray = new Uint8Array(binaryString as ArrayBuffer);
  //     // Enviar os dados binários para o servidor
  //     this.uintArrayFile = uintArray;
  //   };
  //   reader.readAsArrayBuffer(file);
  // }

  convertToFileBlob(file: File) {
    this.fileBlob = new Blob([file], { type: file.name + file.type });
    console.log(this.fileBlob)
  }

  saveToDatabase(){
    if (this.fileBlob !== null) {
      this.atividadeService.CadastrarAtividade(this.fileBlob, this.idAtividade, this.idEstudanteUsuarioLogado)
        .subscribe(() => { console.log("Upload concluído!") }
      );
    }
  }

  ngOnChanges(){
    this.atividadeTipoId;
  }

  ngOnDestroy(): void {
    this.inscricao.unsubscribe();
  }

}
