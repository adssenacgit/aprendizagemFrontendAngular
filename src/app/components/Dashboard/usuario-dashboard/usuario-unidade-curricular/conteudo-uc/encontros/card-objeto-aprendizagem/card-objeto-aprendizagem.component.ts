import { Component, Input, OnInit } from '@angular/core';
import { Acompanhamento } from 'src/app/models/Acompanhamento';
import { ObjetoAprendizagem } from 'src/app/models/ObjetoAprendizagem';
import { Participante } from 'src/app/models/Participante';
import { AcompanhamentoService } from 'src/app/services/acompanhamento.service';
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
  @Input()
  participante: Participante;

  objetoComArquivo: ObjetoAprendizagem

  arquivoData: File;
  teste: string
  selected: boolean = false;
  loading = true;

  constructor(
    private dataService: DataService,
    private objetoAprendizagemService: ObjetoAprendizagemService,
    private acompanhamentoService: AcompanhamentoService
  ) { }

  ngOnInit(): void {
    this.objetoAprendizagemService.obterObjetoComRecursoPorIdJava(this.objeto.id)
      .subscribe(
        response => {
          this.objeto = response
          this.loading = false
        }
      )
  }

  enviarArquivoParaODocViewer(dataBase64: string) {
    // var file = this.decodeBase64ToFile(dataBase64)
    this.dataService.setDataSource(dataBase64);
    this.selected = true;
  }

  toggleAcompanhamento(e: any, objeto: ObjetoAprendizagem) {
    if(e.checked == true) {
      let acompanhamento: Acompanhamento = new Acompanhamento();
      acompanhamento.participante = this.participante
      acompanhamento.objetoAprendizagemId = objeto.id
      acompanhamento.status = 1
      this.acompanhamentoService.novoAcompanhamentoJava(acompanhamento)
        .subscribe(
          res => console.log(res)
        )
    }
    else {
      let acompanhamento: Acompanhamento = new Acompanhamento();
      acompanhamento.participante = this.participante
      acompanhamento.objetoAprendizagemId = objeto.id
      acompanhamento.status = 0
      console.log(acompanhamento)
      this.acompanhamentoService.novoAcompanhamentoJava(acompanhamento)
        .subscribe(
          res => console.log(res)
        )
    }
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

  setObjetoSource(){
    this.objetoAprendizagemService.setObjetoSource(this.objeto)
  }

  setDataSource() {
    this.dataService.setDataSource(this.objeto)
  }
}
