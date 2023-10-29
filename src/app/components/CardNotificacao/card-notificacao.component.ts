import { Component, Input, OnInit } from '@angular/core';
import {Notificacao} from "../../models/Notificacao";

@Component({
  selector: 'app-card-notificacao',
  templateUrl: './card-notificacao.component.html',
  styleUrls: ['./card-notificacao.component.css']
})
export class CardNotificacaoComponent {
  @Input() $notificacoes: Notificacao[] = [];
}
