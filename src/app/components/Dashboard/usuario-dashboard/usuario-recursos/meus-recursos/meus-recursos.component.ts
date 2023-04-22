import { Component, OnInit ,OnDestroy} from '@angular/core';
import { Recurso } from 'src/app/models/Recurso';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { RecursoService } from 'src/app/services/recurso.service';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostagemDeRecursosComponent } from '../postagem-de-recursos/postagem-de-recursos.component';
@Component({
  selector: 'app-meus-recursos',
  templateUrl: './meus-recursos.component.html',
  styleUrls: ['./meus-recursos.component.css'],
  providers: [DialogService]
})
export class MeusRecursosComponent implements OnInit ,OnDestroy{


  ref: DynamicDialogRef;


  

  recursos : Recurso[];
  uploadedFiles: any[] = [];
  loading: boolean = true;
  idUsuarioLogado : string;
  maxFileSize : number = 1000000;
  cols: any[];
  selectedRecursos: Recurso;

  botaoUp:FileUploadModule;
  constructor(
    private dialogService: DialogService,
    private recursoService : RecursoService,
    private authGuardService: AuthGuardService,
    
  ) { }

  ngOnInit(): void {
   
    this.idUsuarioLogado = this.authGuardService.getIdUsuarioLogado();

    this.recursoService.ObterRecursoPeloUsuarioId(this.idUsuarioLogado).subscribe(resultado=>{
        this.recursos = resultado;        
    })
    
    this.cols = [
      { field: 'nomeArquivo', header: 'Nome' },
      { field: 'descricao', header: 'Descrição' },
      { field: 'arquivo.length.size', header: 'arquivo' },
      { field: 'status', header: 'Status' }
  ];  
    
  // this.botaoUp = ['{background-color: black}'];

  }


  
  teladepostagem(){
    return true
  }
  show() {
    this.ref = this.dialogService.open(PostagemDeRecursosComponent, { header: 'Postagem de Recursos' ,
    
    width: '50%',
    contentStyle: { overflow: 'auto' },
    baseZIndex: 10000,
    maximizable: true
  
    });
    }

  ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
  }

}
