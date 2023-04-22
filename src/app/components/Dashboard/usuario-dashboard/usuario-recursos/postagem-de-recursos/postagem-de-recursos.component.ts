import { Component, OnInit ,OnDestroy,EventEmitter,Output} from '@angular/core';
import { Recurso } from 'src/app/models/Recurso';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { RecursoService } from 'src/app/services/recurso.service';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormControl, FormGroup,Validators } from '@angular/forms';



@Component({
  selector: 'app-postagem-de-recursos',
  templateUrl: './postagem-de-recursos.component.html',
  styleUrls: ['./postagem-de-recursos.component.css']
})
export class PostagemDeRecursosComponent implements OnInit {
  
  @Output() onSubmit = new  EventEmitter<Recurso>()

  value: string;
  uploadedFiles: any[] = [];

  constructor(
    private recursoService : RecursoService,
    private authGuardService: AuthGuardService,
    
  ) { }


  postagemForm!: FormGroup

  ngOnInit(): void {
    this.postagemForm = new FormGroup({
      id: new FormControl(''),
      nomeArquivo: new FormControl('',[Validators.required]),
      descricao: new FormControl('',[Validators.required]),
      file: new FormControl('')
    }
  )};

  get nomeArquivo(){
    return this.postagemForm.get('nomeArquivo')!;
  }

  get descricao(){
    return this.postagemForm.get('descricao')!;
  }

  onUpload(event : any) {
    for(let file of event.files) {
        this.uploadedFiles.push(file);
    }
}

  onFileSelected(event:any){

    const file: File = event.target.files[0];
    this.postagemForm.patchValue({file : file});
  }

  submit(){
    if(this.postagemForm.invalid){
      return;
    }
    console.log(this.postagemForm.value)

    this.onSubmit.emit(this.postagemForm.value);
    // this.momentForm.reset();

  }
}



