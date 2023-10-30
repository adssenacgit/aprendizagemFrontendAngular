import { Component, Input, OnInit } from '@angular/core';
import { ObjetoAprendizagem } from 'src/app/models/ObjetoAprendizagem';
import { DataService } from 'src/app/services/data-service.service';
import { ObjetoAprendizagemService } from 'src/app/services/objetoaprendizagem.service';

@Component({
  selector: 'app-card-objeto-aprendizagem',
  templateUrl: './card-objeto-aprendizagem.component.html',
  styleUrls: ['./card-objeto-aprendizagem.component.css']
})
export class CardObjetoAprendizagemComponent implements OnInit{


  @Input()
  objeto: ObjetoAprendizagem;

  objetoComArquivo: ObjetoAprendizagem

  arquivoData: File;
  teste: string
  selected: boolean = false;

  constructor(
    private dataService: DataService,
    private objetoAprendizagemService: ObjetoAprendizagemService
  ) { }

  ngOnInit(): void {
    // console.log(this.objeto)
  }

  enviarArquivoParaODocViewer(dataBase64: string) {
    // var file = this.decodeBase64ToFile(dataBase64)
    this.dataService.setData(dataBase64);
    this.selected = true;
  }

  decodeBase64ToFile(base64String: string) {
    const binaryString = atob(base64String);
    const byteArray = new Uint8Array(binaryString.length);

    for (let i = 0; i < binaryString.length; i++) {
      byteArray[i] = binaryString.charCodeAt(i);
    }

    const blob = new File([byteArray], 'application/octet-stream');

    const url = URL.createObjectURL(blob);

    return blob;
  }

  setObjetoSource(objeto: ObjetoAprendizagem){
    this.objetoAprendizagemService.setObjetoSource(objeto)
  }

  getObjeto(objeto: ObjetoAprendizagem) {
    this.objetoAprendizagemService.obterObjetoAprendizagemPorId(objeto.id)
      .subscribe({
        next: response => {
          this.objetoComArquivo = response
        },
        complete: () => this.dataService.setData(this.objetoComArquivo.arquivo)
      })
  }
}
