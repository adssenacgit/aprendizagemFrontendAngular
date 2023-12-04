import { ObjetoAprendizagemService } from 'src/app/services/objetoaprendizagem.service';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from 'src/app/services/data-service.service';
import { Subscription } from 'rxjs';
import { ObjetoAprendizagem } from 'src/app/models/ObjetoAprendizagem';
import { Atividade } from 'src/app/models/Atividade';
import { AtividadeService } from 'src/app/services/atividade.service';
import { Recurso } from 'src/app/models/Recurso';

@Component({
  selector: 'app-doc-viewer',
  templateUrl: './doc-viewer.component.html',
  styleUrls: ['./doc-viewer.component.css']
})
export class DocViewerComponent implements OnInit {

  data: Recurso[];
  arquivoDataString: string;
  modoExibicao: string;
  objeto: ObjetoAprendizagem;
  atividade: Atividade;

  constructor(
    private dataService: DataService,
    private objetoAprendizagemService: ObjetoAprendizagemService,
    private atividadeService: AtividadeService
  ) { }

  ngOnInit(): void {
    this.dataService.currentData
      .subscribe(
          response => {
              console.log(response)
              this.data = response.recursos
              this.decodeBase64ToDataUrl(this.data[0])
              this.modoExibicao = 'arquivo'
              console.log(this.data)
              console.log(this.modoExibicao)
            }
      )

    this.objetoAprendizagemService.currentObjeto
      .subscribe({
        next: (response) => {
          if(response != null) {
            this.objeto = response
            this.modoExibicao = 'texto'
          }
        }
      })

    this.atividadeService.currentAtividade
    .subscribe({
      next: (response) => {
        if(response != null) {
          this.atividade = response
          this.modoExibicao = 'atividade'
        }
      }
    })
  }

  contentLoaded() {
    // console.log(this.arquivoDataString)
    console.log('File loaded');
  }

  decodeBase64ToDataUrl(recurso: Recurso) {
    const binaryString = atob(recurso.arquivo);
    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([byteArray], { type: recurso.mimeType });

    this.arquivoDataString = URL.createObjectURL(blob);
    console.log(this.arquivoDataString)
  }
}

