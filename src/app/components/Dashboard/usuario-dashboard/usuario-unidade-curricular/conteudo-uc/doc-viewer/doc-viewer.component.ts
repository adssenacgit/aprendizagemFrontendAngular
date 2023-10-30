import { ObjetoAprendizagemService } from 'src/app/services/objetoaprendizagem.service';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { DataService } from 'src/app/services/data-service.service';
import { Subscription } from 'rxjs';
import { ObjetoAprendizagem } from 'src/app/models/ObjetoAprendizagem';

@Component({
  selector: 'app-doc-viewer',
  templateUrl: './doc-viewer.component.html',
  styleUrls: ['./doc-viewer.component.css']
})
export class DocViewerComponent implements OnInit {

  // pdfSrc = 'http://www.pdf995.com/samples/pdf.pdf';
  arquivoDataString: string;

  modoExibicao: string;
  objeto: ObjetoAprendizagem;

  constructor(
    private dataService: DataService,
    private objetoAprendizagemService: ObjetoAprendizagemService
  ) { }

  ngOnInit(): void {
    this.dataService.currentData
      .subscribe(
          response => {
            if(response.length > 0){
              console.log(response)
              this.arquivoDataString = this.decodeBase64ToDataUrl(response)
              this.modoExibicao = 'arquivo'
              console.log(this.arquivoDataString)
              console.log(this.modoExibicao)
            }
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
  }

  contentLoaded() {
    // console.log(this.arquivoDataString)
    console.log('File loaded');
  }

  decodeBase64ToDataUrl(base64String: string) {
    const binaryString = atob(base64String);
    const byteArray = new Uint8Array(binaryString.length);
    for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }
    const blob = new Blob([byteArray], { type: 'application/pdf' });

    return URL.createObjectURL(blob);
  }
}

