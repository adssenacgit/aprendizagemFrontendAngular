import { Component, OnInit, OnDestroy, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Recurso } from 'src/app/models/Recurso';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { RecursoService } from 'src/app/services/recurso.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import Swal from 'sweetalert2';
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
export class MeusRecursosComponent implements OnInit, OnChanges,OnDestroy{

  @Input() recursos: Recurso[]
  @Input() modoExibicao: string = 'privado';
  editing: boolean = false;
  ref: DynamicDialogRef;

  idUsuarioLogado: string;
  isAdministrator: boolean = false;
  recurso: Recurso;
  uploadedFiles: any[] = [];
  maxFileSize: number = 1000000;
  uploadVisible: boolean = false;
  editVisible: boolean = false;
  filteredItems: Recurso[];
  filtro: string;
  selectedRecursos: Recurso[] = [];

  descricao : string = '' ;
  nomeArquivo: string= '';

  //recursoURL: string;
  //viewer: string = 'pdf'

  constructor(
    private recursoService : RecursoService,
    private authGuardService: AuthGuardService,
    private confirmationService: ConfirmationService,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.filteredItems = this.recursos;
  }

  ngOnInit(): void {
    this.idUsuarioLogado = this.authGuardService.getIdUsuarioLogado();
    this.isAdministrator = this.authGuardService.VerificarAdministrador();
    console.log(this.isAdministrator)
    this.filteredItems = this.recursos;
  }

  ngOnDestroy() {
    this.selectedRecursos = [];
    if (this.ref)
      this.ref.close();
  }

  toggleDialogUpload() {
    this.uploadVisible = !this.uploadVisible;
  }

  toggleDialogEdit(recurso: Recurso) {
    this.nomeArquivo = recurso.nomeArquivo
    this.recurso = recurso
    this.editVisible = !this.editVisible;
  }

  onUpload(event: UploadEvent) {
    const file = event.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      const arquivo = e.target?.result as string;
      const formatAquivo = arquivo.split(',')[1];

      const recurso: Recurso = {
        id: 0,
        descricao: this.descricao,
        nomeArquivo: file.name,
        arquivo: formatAquivo,
        mimeType: file.type,
        dataCadastro: new Date().toISOString(),
        status: 1,
        tamanho: file.size,
        usuarioId: this.idUsuarioLogado,
      };

      this.recursoService.SalvarRecursoJava(recurso).subscribe({
        next: (response) => {
          this.toggleDialogUpload();
          Swal.fire({
            title: 'Sucesso!',
            text: 'Seu recurso foi salvo com sucesso.',
            icon: 'success',
            confirmButtonText: 'OK',
            focusConfirm: false
          }).then(() => {
            location.reload();
          });
        },
        error: (error) => {
          this.toggleDialogUpload();
          Swal.fire({
            title: 'Erro!',
            text: 'Não foi possível salvar seu recurso.',
            icon: 'error',
            confirmButtonText: 'OK',
            focusConfirm: false
          });
        },
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
          location.reload();
        });
      }
    });
  }

  onShare(recurso: Recurso) {
    const id: number = recurso.id
    if(recurso.status === 1){
      const status: number = 2
      this.recursoService.AtualizarRecursoStatusJava(id, status).subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Sucesso!',
            text: 'Seu recurso foi compartilhado.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            location.reload();
          });
        }
      });
    }
    else {
      const status: number = 1
      this.recursoService.AtualizarRecursoStatusJava(id, status).subscribe({
        next: (response) => {
          Swal.fire({
            title: 'Sucesso!',
            text: 'Seu recurso não está mais sendo compartilhado.',
            icon: 'success',
            confirmButtonText: 'OK'
          }).then(() => {
            location.reload();
          });
        }
      });
    }
  }

  confirmShare(rowData: Recurso) {
    if(rowData.status === 1){
      this.confirmationService.confirm({
        message: 'Deseja tornar este recurso público?',
        header: 'Confirmação de compartilhamento',
        icon: 'pi pi-info-circle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => {
          this.onShare(rowData);
        },
        rejectButtonStyleClass: 'p-button-danger',
        acceptButtonStyleClass: 'p-button-success'
      });
    }
    else {
      this.confirmationService.confirm({
        message: 'Deseja tornar este recurso privado?',
        header: 'Parar de compartilhar',
        icon: 'pi pi-info-circle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => {
          this.onShare(rowData);
        },
        rejectButtonStyleClass: 'p-button-danger',
        acceptButtonStyleClass: 'p-button-success'
      });
    }
  }
  confirmDelete(rowData: any) {
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

  onEdit(nomeArquivoAtualizado: string, recurso: Recurso) {
    this.recursoService.AtualizarRecursoNomeJava(recurso.id, nomeArquivoAtualizado).subscribe({
      next: (response) => {
        this.editVisible = !this.editVisible;
        Swal.fire({
          title: 'Sucesso!',
          text: 'Seu recurso foi renomeado com sucesso.',
          icon: 'success',
          confirmButtonText: 'OK',
          focusConfirm: false
        }).then(() => {
          location.reload();
        });
      },
      error: (error) => {
        this.editVisible = !this.editVisible;
        Swal.fire({
          title: 'Erro!',
          text: 'Não foi possível renomear seu recurso.',
          icon: 'error',
          confirmButtonText: 'OK',
          focusConfirm: false
        });
      }
    });
  }


  ondownload(event: any) {
    this.recursoService.ObterArquivoRecursoPorIdJava(event.id).subscribe({
      next: (response => {
        this.downloadFile(response, event.nomeArquivo)
        // this.decodeBase64ToFile(this.recurso.arquivo, this.recurso.nomeArquivo);
      }),
    })
    // const arquivo = event.arquivo
    // const nomeArquivo = event.nomeArquivo

    // this.decodeBase64ToFile(this.recurso.arquivo, this.recurso.nomeArquivo);

  }

  // displayFile(event: any) {
  //   this.recursoService.ObterRecursoPorIdJava(event.id).subscribe({
  //     next: (response => {
  //       if(response.type.match('application/pdf')){
  //         this.viewer = 'pdf'
  //       } else if (response.type.match('application/vnd.openxmlformats-officedocument.wordprocessingml.document')){
  //         this.viewer = 'mammoth'
  //       } else (this.viewer = 'url')
  //       console.log(this.viewer)
  //       this.recursoURL = URL.createObjectURL(response)
  //       // this.decodeBase64ToFile(this.recurso.arquivo, this.recurso.nomeArquivo);
  //     }),
  //   })
  // }

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
    const filtro = this.filtro.toLowerCase();
    this.filteredItems = this.recursos.filter((recurso: Recurso) => {
      return recurso.nomeArquivo.toLowerCase().includes(filtro) ||
             recurso.descricao.toLowerCase().includes(filtro);
    });
  }

  contentLoaded() {
    // console.log(this.arquivoDataString)
    // console.log('File loaded');
  }

  getTipoArquivoDoMimeType(mimeType: string) {
    switch (mimeType) {
      case "image/jpeg":
      case "image/jpg":
      case "image/png":
      case "image/gif":
      case "image/bmp":
        return "Imagem";
      case "application/pdf":
        return "PDF";
      case "text/plain":
      case "text/html":
      case "application/xhtml+xml":
        return "Documento de Texto";
      case "application/msword":
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        return "Documento do Word";
      case "application/vnd.ms-excel":
      case "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet":
        return "Planilha do Excel";
      case "application/vnd.ms-powerpoint":
      case "application/vnd.openxmlformats-officedocument.presentationml.presentation":
        return "Apresentação do PowerPoint";
      case "audio/mpeg":
      case "audio/mp3":
      case "audio/mp4":
      case "audio/wav":
        return "Arquivo de Áudio";
      case "video/mpeg":
      case "video/mp4":
        return "Vídeo"
      case "application/javascript":
      case "text/javascript":
      case "application/x-javascript":
        return "Arquivo JavaScript";
      case "text/x-python":
        return "Arquivo Python";
      case "application/typescript":
      case "text/typescript":
        return "Arquivo TypeScript";
      case "text/java":
      case "application/java-archive":
      case "text/x-java-source":
        return "Arquivo Java";
      case "application/octet-stream":
        return "Arquivo ISO";
      case "text/css":
        return "Arquivo CSS";
      case "text/csv":
      case "text/comma-separated-values":
        return "Arquivo CSV";
      case "application/x-rar-compressed":
      case "application/vnd.rar":
        return "Arquivo RAR";
      case "application/rtf":
        return "Documento RTF";
      case "application/x-powershell":
      case "application/postscript":
        return "Script PowerShell (PS1)";
      case "application/bat":
      case "application/x-bat":
        return "Arquivo de Lote (BAT)";
      case "application/zip":
        return "Arquivo zip";
      case "application/x-msdownload":
        return "Arquivo executável"
      default:
        return "Desconhecido";
    }
  }

  formatarDataComHora(dateString: string): string {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}`;
  }

  formatarTamanhoArquivo(bytes: number) {
    if (!bytes) {
      return '0 B'
    }
    else if (bytes < 1000) {
        return bytes + " B";
    } else if (bytes < 1000 * 1000) {
        return (bytes / 1000).toFixed(2) + " KB";
    } else {
        return (bytes / (1000 * 1000)).toFixed(2) + " MB";
    }
  }
}
