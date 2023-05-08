import { Component, OnInit ,OnDestroy,Output} from '@angular/core';
import { Recurso } from 'src/app/models/Recurso';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { RecursoService } from 'src/app/services/recurso.service';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PostagemDeRecursosComponent } from '../postagem-de-recursos/postagem-de-recursos.component';
import { EventEmitter } from 'stream';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/Usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-meus-recursos',
  templateUrl: './meus-recursos.component.html',
  styleUrls: ['./meus-recursos.component.css'],
  providers: [DialogService]
})
export class MeusRecursosComponent implements OnInit ,OnDestroy{




  ref: DynamicDialogRef;


  
  recursos: Recurso[];
  uploadedFiles: any[] = [];
  loading: boolean = true;
  idUsuarioLogado: string;
  maxFileSize: number = 1000000;
  usuario: Usuario;
  visible: any;
  filteredItems: Recurso[];
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
    });
  
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


  // testes

  showDialog() {
    this.visible = true;
  }
  
  closeDialog() {
    this.visible = false;
  }
  
  onUpload(item: any) {
    const fileReader = new FileReader();
  
  
    for (let file of item.files) {
      fileReader.onload = (e) => {
        const arquivo = e.target?.result as string;
        const formatAquivo = arquivo.split(',')[1];
  
        const Recurso = {
          id: 7,
          descricao: "",
          nomeArquivo: file.name,
          arquivo: formatAquivo,
          dataCadastro: new Date().toISOString(),
          status: 1,
          usuarioId: this.idUsuarioLogado,
        };
  
        this.recursoService.SalvarRecurso(Recurso).subscribe({
          next: (response) => {
            this.closeDialog();
            Swal.fire({
              title: 'Sucesso!',
              text: 'Seu recurso foi salvo com sucesso.',
              icon: 'success',
              confirmButtonText: 'OK',
              focusConfirm: false
            }).then(() => {
              console.log(response);
              location.reload();
            });
          },
          error: (error) => {
            this.closeDialog();
            Swal.fire({
              title: 'Erro!',
              text: 'Não foi possível salvar seu recurso.',
              icon: 'error',
              confirmButtonText: 'OK',
              focusConfirm: false
            });
          }
        });
      }
  
      fileReader.readAsDataURL(file);
    }
  }
  
  onDelete(event: any) {
    const id = event.id
    this.recursoService.DeletarRecurso(id).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Sucesso!',
          text: 'Seu recurso foi deletado com sucesso.',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then(() => {
          console.log(response);
          location.reload();
        });
      }
    });
  }
  
  ondownload(event: any) {
    const arquivo = event.arquivo
    const nomeArquivo = event.nomeArquivo
  
    this.decodeBase64ToFile(arquivo, nomeArquivo);
  
  }
  
  decodeBase64ToFile(base64String: string, fileName: string) {
    const binaryString = atob(base64String);
    const byteArray = new Uint8Array(binaryString.length);
  
    for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }
  
    const blob = new Blob([byteArray], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
  
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }


}
