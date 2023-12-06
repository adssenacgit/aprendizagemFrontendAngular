import { Component, OnInit } from '@angular/core';
import { SenacCoin } from 'src/app/models/SenacCoin';
import { SenacCoinMovimentacao } from 'src/app/models/SenacCoinMovimentacao';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { SenacCoinMovimentacaoService } from 'src/app/services/senac-coin-movimentacao.service';
import { SenacCoinService } from 'src/app/services/senac-coin.service';

@Component({
  selector: 'app-senac-coin',
  templateUrl: './usuario-senac-coin.component.html',
  styleUrls: ['./usuario-senac-coin.component.css']
})
export class UsuarioSenacCoinComponent implements OnInit {
  senacCoins: SenacCoin[] = [];
  senacCoinMovimentacoes: SenacCoinMovimentacao[] = [];
  isLoading: boolean = true;

  constructor(
    private _senacCoinService: SenacCoinService,
    private _senacCoinMovimentacao: SenacCoinMovimentacaoService,
    private _authGuardService: AuthGuardService
    ) { }

  ngOnInit(): void {
    this._senacCoinService
      .ObterSenacCoinPeloEstudanteNome(this._authGuardService.getNomeUsuarioLogado())
      .subscribe({
        next:(resultado: SenacCoin[])=>{
          this.senacCoins = resultado;
          this.isLoading = false;
        }
      });

    this._senacCoinMovimentacao
      .ObterSenacCoinMovimentacaoPeloUsuarioId(this._authGuardService.getIdUsuarioLogado())
      .subscribe({
        next:(resultado: SenacCoinMovimentacao[])=>{
          this.senacCoinMovimentacoes = resultado;
          this.isLoading = false;
        }
      });

  }
}
