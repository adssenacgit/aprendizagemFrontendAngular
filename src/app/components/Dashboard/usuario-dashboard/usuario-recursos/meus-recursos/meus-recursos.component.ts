import { Component, OnInit ,OnDestroy} from '@angular/core';
import { Recurso } from 'src/app/models/Recurso';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { RecursoService } from 'src/app/services/recurso.service';
import { FileUploadModule } from 'primeng/fileupload';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
import { Usuario } from 'src/app/models/Usuario';
import { ConfirmationService } from 'primeng/api';


interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-meus-recursos',
  templateUrl: './meus-recursos.component.html',
  styleUrls: ['./meus-recursos.component.css'],
  providers: [DialogService ,ConfirmationService]
})
export class MeusRecursosComponent implements OnInit, OnDestroy{

  ref: DynamicDialogRef;

  recurso: Recurso;
  recursos: Recurso[];
  uploadedFiles: any[] = [];
  loading: boolean = true;
  idUsuarioLogado: string;
  maxFileSize: number = 1000000;
  usuario: Usuario;
  visible: any;
  filteredItems: Recurso[];
  cols: any[];
  selectedRecursos: Recurso[] = [];

  botaoUp:FileUploadModule;

  descricao : string = '' ;
  nomeArquivo: string= '';

  atividade:any;

  filtro: string;
  checkboxSelected = false;
  recursoURL: string;
  viewer: string = 'pdf'

  constructor(
    private dialogService: DialogService,
    private recursoService : RecursoService,
    private authGuardService: AuthGuardService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.idUsuarioLogado = this.authGuardService.getIdUsuarioLogado();

    this.recursoService.ObterRecursoPeloUsuarioIdJava(this.idUsuarioLogado).subscribe(resultado => {
      this.recursos = resultado;
      this.filteredItems = this.recursos; // Inicializa filteredItems com os mesmos valores de recursos
    });

    this.cols = [
      { field: 'nomeArquivo', header: 'Nome' },
      { field: 'descricao', header: 'Descrição' },
      { field: 'mimeType', header: 'Mime Type'}
    ];
  }

  teladepostagem(){
    return true
  }

  ngOnDestroy() {
    this.selectedRecursos = [];
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

  onUpload(event: UploadEvent) {
    const file = event.files[0];
    const reader = new FileReader();
    console.log(file.type)
    console.log(file.name)
    console.log(file.size)

    reader.onload = (e) => {
      const arquivo = e.target?.result as string;
      const formatAquivo = arquivo.split(',')[1];


      const recurso = {
        id: 0,
        descricao: this.descricao,
        nomeArquivo: file.name,
        arquivo: formatAquivo,
        mimeType: file.type,
        dataCadastro: new Date().toISOString(),
        status: 1,
        usuarioId: this.idUsuarioLogado,
      };

      this.recursoService.SalvarRecurso(recurso).subscribe({
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
    };

    reader.readAsDataURL(file);
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

  confirm2(rowData: any) {
    this.confirmationService.confirm({
      message: 'Deseja excluir este recurso?',
      header: 'Confirmação de Exclusão',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      accept: () => {
        this.onDelete(rowData);
      },
      rejectButtonStyleClass: 'p-button-danger',
      acceptButtonStyleClass: 'p-button-success'
    });

  }





  ondownload(event: any) {
    this.recursoService.ObterRecursoPorIdJava(event.id).subscribe({
      next: (response => {
        this.downloadFile(response, event.nomeArquivo)
        // this.decodeBase64ToFile(this.recurso.arquivo, this.recurso.nomeArquivo);
      }),
    })
    // const arquivo = event.arquivo
    // const nomeArquivo = event.nomeArquivo

    // this.decodeBase64ToFile(this.recurso.arquivo, this.recurso.nomeArquivo);

  }

  displayFile(event: any) {
    this.recursoService.ObterRecursoPorIdJava(event.id).subscribe({
      next: (response => {
        if(response.type.match('application/pdf')){
          this.viewer = 'pdf'
        } else if (response.type.match('application/vnd.openxmlformats-officedocument.wordprocessingml.document')){
          this.viewer = 'mammoth'
        } else (this.viewer = 'url')
        console.log(this.viewer)
        this.recursoURL = URL.createObjectURL(response)
        // this.decodeBase64ToFile(this.recurso.arquivo, this.recurso.nomeArquivo);
      }),
    })
  }

  downloadFile(recursoBlob: Blob, fileName: string) {
    const url = URL.createObjectURL(recursoBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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



  filtrarRecursos() {
    const filtro = this.filtro.toLowerCase(); // Converter o filtro para minúsculas para comparar de forma insensível a maiúsculas e minúsculas

    this.filteredItems = this.recursos.filter((recurso: Recurso) => {
      // Aplicar a lógica de filtro desejada aqui
      return recurso.nomeArquivo.toLowerCase().includes(filtro) ||
             recurso.descricao.toLowerCase().includes(filtro);
    });
  }

  contentLoaded() {
    // console.log(this.arquivoDataString)
    // console.log('File loaded');
  }
}
