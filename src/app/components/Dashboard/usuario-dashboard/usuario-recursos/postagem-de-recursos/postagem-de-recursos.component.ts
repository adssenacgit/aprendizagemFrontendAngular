import { Component, OnInit ,OnDestroy,EventEmitter,Output,Input} from '@angular/core';
import { Recurso } from 'src/app/models/Recurso';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { Usuario } from 'src/app/models/Usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { RecursoService } from 'src/app/services/recurso.service';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormControl, FormGroup,Validators } from '@angular/forms';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-postagem-de-recursos',
  templateUrl: './postagem-de-recursos.component.html',
  styleUrls: ['./postagem-de-recursos.component.css']
})
export class PostagemDeRecursosComponent implements OnInit {
    @Input() visible : boolean
 // @Output() onSubmit = new  EventEmitter<Recurso>()

  value: string;
  //uploadedFiles: any[] = [];


  recursos: Recurso[];
  uploadedFiles: any[] = [];
  loading: boolean = true;
  idUsuarioLogado: string;
  maxFileSize: number = 1000000;
  usuario: Usuario;
 // visible: any;
  filteredItems: Recurso[];


  constructor(
    private recursoService: RecursoService,
    private authGuardService: AuthGuardService,
    private usuarioService: UsuariosService,
  ) { }


  postagemForm!: FormGroup

  ngOnInit(): void {

    this.idUsuarioLogado = this.authGuardService.getIdUsuarioLogado();
  
  }

  //   this.postagemForm = new FormGroup({
  //     id: new FormControl(null),
  //     descricao: new FormControl('',[Validators.required]),
  //     nomeArquivo: new FormControl('',[Validators.required]),
  //     File: new FormControl('')
  //     // dataCadastro: new FormControl(null),
  //     // status:       new FormControl(null),
  //     // usuarioId:    new FormControl(null),
  //     // usuario: new FormControl(null),
  //   }
  // )};

  // get nomeArquivo(){
  //   return this.postagemForm.get('nomeArquivo')!
  // }

  // get descricao(){
  //   return this.postagemForm.get('descricao')!;
  // }

//   onUpload(event : any) {
//     for(let file of event.files) {
//         this.uploadedFiles.push(file);
//     }
// }

  // onFileSelected(event:any){

  //   const file: File = event.target.files[0];
  //   this.postagemForm.patchValue({file : file});
  // }

  // submit(){
  //   if(this.postagemForm.invalid){
  //     return;
  //   }
  //   console.log(this.postagemForm.value)

  //   this.onSubmit.emit(this.postagemForm.value);
  //   // this.momentForm.reset();

  // }

/////////////////////////////////////////////////////////////

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



