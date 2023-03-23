import { Component, OnInit } from '@angular/core';
import { Recurso } from 'src/app/models/Recurso';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { RecursoService } from 'src/app/services/recurso.service';

@Component({
  selector: 'app-usuario-recursos',
  templateUrl: './usuario-recursos.component.html',
  styleUrls: ['./usuario-recursos.component.css']
})
export class UsuarioRecursosComponent implements OnInit {

  recursos : Recurso[];
  uploadedFiles: any[] = [];
  loading: boolean = true;
  idUsuarioLogado : string;
  maxFileSize : number = 1000000;


  constructor(
    private recursoService : RecursoService,
    private authGuardService: AuthGuardService
  ) { }

  ngOnInit(): void {
   
    this.idUsuarioLogado = this.authGuardService.getIdUsuarioLogado();

    this.recursoService.ObterRecursoPeloUsuarioId(this.idUsuarioLogado).subscribe(resultado=>{
        this.recursos = resultado;        
    })    
  }

  onUpload(event : any) {
      for(let file of event.files) {
          this.uploadedFiles.push(file);
      }
  }

}