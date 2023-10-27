import { Component, OnInit } from '@angular/core';
import { Recurso } from 'src/app/models/Recurso';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { RecursoService } from 'src/app/services/recurso.service';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-usuario-recursos',
  templateUrl: './usuario-recursos.component.html',
  styleUrls: ['./usuario-recursos.component.css']
})
export class UsuarioRecursosComponent implements OnInit {

  recursos: Recurso[]
  armazenamentoUsado: number = 0;
  armazenamentoUsadoEmMb: number = 0;
  modoExibicao: string ='privado'

  idUsuarioLogado : string;
  constructor(
    private recursoService : RecursoService,
    private authGuardService: AuthGuardService
  ) { }


  ngOnInit(): void {
    this.idUsuarioLogado = this.authGuardService.getIdUsuarioLogado();
    this.obterMeusRecursos();
  }

  obterMeusRecursos() {
    this.recursoService.ObterRecursoPeloUsuarioIdJava(this.idUsuarioLogado).subscribe({
      next: (resultado) => {
        this.modoExibicao = 'privado'
        if (resultado != null){
          this.recursos = resultado;
        } else {
          this.recursos = []
        }
      },
      complete: () => {
        this.calcularArmazenamentoUsado(this.recursos)
      }
    });
  }

  obterRecursosPublicos() {
    this.recursoService.ObterRecursoPublicosJava().subscribe({
      next: (resultado) => {
        this.modoExibicao = 'publico'
        if (resultado != null){
          this.recursos = resultado;
        } else {
          this.recursos = []
        }
      }
    });
  }

  calcularArmazenamentoUsado (recursos: Recurso[]) {

    recursos.length > 0 ? recursos.map((recurso) => this.armazenamentoUsado += recurso.tamanho) : 'this.armazenamentoUsadoEmMb = 0;'
    this.armazenamentoUsadoEmMb = Math.ceil(this.armazenamentoUsado * (10 ** -6));
    // if(recursos.length > 0){
    //   for (let recurso of recursos) {
    //     this.armazenamentoUsado += recurso.tamanho
    //   }
    //   this.armazenamentoUsadoEmMb = Math.ceil(this.armazenamentoUsado * (10 ** -6));
    // }
    // else {
    //   this.armazenamentoUsadoEmMb = 0;
    // }
  }
}
