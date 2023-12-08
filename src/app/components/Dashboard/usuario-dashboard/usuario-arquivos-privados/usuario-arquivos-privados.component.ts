import { Component, OnInit } from '@angular/core';
import { Recurso } from 'src/app/models/Recurso';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { RecursoService } from 'src/app/services/recurso.service';

@Component({
  selector: 'app-usuario-arquivos-privados',
  templateUrl: './usuario-arquivos-privados.component.html',
  styleUrls: ['./usuario-arquivos-privados.component.css']
})
export class UsuarioArquivosPrivadosComponent implements OnInit {

  recursos : Recurso[] = [];
  selectedRecurso: Recurso;
  //recurso : Recurso = new Recurso;
  idUsuarioLogado : string;

  constructor(
    private recursoService : RecursoService,
    private authGuardService: AuthGuardService
  ) { }

  ngOnInit(): void {
    //criando array de 4 atividades vazias
    //this.recursos.push(this.recurso);
    //this.recursos.push(this.recurso);
    //this.recursos.push(this.recurso);
    //this.recursos.push(this.recurso);

  //   this.idUsuarioLogado = this.authGuardService.getIdUsuarioLogado();

  //   this.recursoService.ObterRecursoPeloUsuarioId(this.idUsuarioLogado).subscribe(resultado=>{
  //     this.recursos = resultado;
  // }) 
  }

}
