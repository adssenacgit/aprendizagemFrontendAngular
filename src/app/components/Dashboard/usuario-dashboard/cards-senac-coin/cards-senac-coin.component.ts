import {Component, Input, OnInit} from '@angular/core';
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
export class CardsSenacCoinComponent {
  @Input() $senacCoins: SenacCoin[] = [];
  @Input() $senacCoinMovimentacoes: SenacCoinMovimentacao[] = [];
}
