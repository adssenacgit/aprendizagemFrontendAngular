import { Component, Input, OnInit } from '@angular/core';
import { ObjetoAprendizagem } from 'src/app/models/ObjetoAprendizagem';
import { DataService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-card-objeto-aprendizagem',
  templateUrl: './card-objeto-aprendizagem.component.html',
  styleUrls: ['./card-objeto-aprendizagem.component.css']
})
export class CardObjetoAprendizagemComponent implements OnInit{


  @Input()
  objeto: ObjetoAprendizagem;

  arquivoData: File;
  teste: string
  checked: boolean = false;
  selected: boolean = false;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    //  this.dataService.currentData.subscribe(data => this.teste = data)
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


}
