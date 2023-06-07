import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-mensagem',
  templateUrl: './card-mensagem.component.html',
  styleUrls: ['./card-mensagem.component.css']
})
export class CardMensagemComponent implements OnInit {
  @Input() nome: String;
  @Input() mensagemTexto: String;
  @Input() imagemContato: String;
  @Input() estatus: number = 0;
  constructor() { }

  ngOnInit(): void {
  }

}
