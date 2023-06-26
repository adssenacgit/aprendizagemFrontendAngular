import { Component, Input, OnInit } from '@angular/core';
import { Mensagem } from 'src/app/models/Mensagem';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import * as moment from 'moment';

@Component({
  selector: 'app-card-mensagem',
  templateUrl: './card-mensagem.component.html',
  styleUrls: ['./card-mensagem.component.css']
})
export class CardMensagemComponent implements OnInit {
  idUsuarioLogado: string;
  @Input() mensagem: Mensagem;
  data: string;

  constructor(private authGuardService: AuthGuardService) { }

  ngOnInit(): void {
    this.idUsuarioLogado = this.authGuardService.getIdUsuarioLogado();
    if (this.mensagem) {
      this.data = this.converteData(this.mensagem.data);
    }
  }

  converteData(d: string): string {
    const dataFormatada = moment(d).format('DD/MM/YYYY HH:mm');
    return dataFormatada;
  }
}
