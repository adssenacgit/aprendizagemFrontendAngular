import { Component, OnInit } from '@angular/core';
import { cardsData } from './cards-data';
import { SenacCoinMovimentacao } from 'src/app/models/SenacCoinMovimentacao';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { SenacCoinMovimentacaoService } from 'src/app/services/senac-coin-movimentacao.service';
import { SenacCoinService } from 'src/app/services/senac-coin.service';
import { SenacCoin } from 'src/app/models/SenacCoin';

@Component({
  selector: 'app-cards-senac-coin',
  templateUrl: './cards-senac-coin.component.html',
  styleUrls: ['./cards-senac-coin.component.css'],
})
export class CardsSenacCoinComponent implements OnInit {
  cardsData = cardsData;
  itensComprados: any[] = [];
  itemAtivo: boolean = true;
  loading: boolean = true;
  idUsuarioLogado: string;
  senacCoins: SenacCoin = new SenacCoin();
  senacCoinMovimentacoes: SenacCoinMovimentacao[];

  constructor(
    private senacCoinService: SenacCoinService,
    private senacCoinMovimentacao: SenacCoinMovimentacaoService,
    private authGuardService: AuthGuardService
  ) {}

  ngOnInit() {
    this.idUsuarioLogado = this.authGuardService.getIdUsuarioLogado();
    this.senacCoinService
      .ObterSenacCoinPeloUsuarioId(this.idUsuarioLogado)
      .subscribe((resultado) => {
        this.senacCoins = resultado;
        this.loading = false;
      });

    this.senacCoinMovimentacao
      .ObterSenacCoinMovimentacaoPeloUsuarioId(this.idUsuarioLogado)
      .subscribe((resultado) => {
        this.senacCoinMovimentacoes = resultado;
        this.loading = false;
      });
  }

  // comprarItem(item: Item): void {
  //   if (this.senacCoins.saldo >= senacCoinsCatalogo.valor) {
  //     this.senacCoins.saldo -= senacCoinsCatalogo.valor;
  //     this.itensComprados.push(item);
  //     console.log(`Item '${item.nome}' comprado com sucesso!`);
  //   } else {
  //     console.log(`Saldo insuficiente para comprar o item '${item.nome}'.`);
  //   }
  // }

}
