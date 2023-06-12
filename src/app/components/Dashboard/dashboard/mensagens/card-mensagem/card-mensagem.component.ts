import { Component, Input, OnInit } from '@angular/core';
import { Mensagem } from 'src/app/models/Mensagem';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

@Component({
  selector: 'app-card-mensagem',
  templateUrl: './card-mensagem.component.html',
  styleUrls: ['./card-mensagem.component.css']
})
export class CardMensagemComponent implements OnInit {
  idUsuarioLogado : string;
  @Input() mensagem: Mensagem;


  constructor(private authGuardService: AuthGuardService) { }

  ngOnInit(): void {
    this.idUsuarioLogado = this.authGuardService.getIdUsuarioLogado();
  }

}
