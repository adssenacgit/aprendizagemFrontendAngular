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

  senacCoins : SenacCoin = new SenacCoin();
  loading: boolean = true;
  senacCoinMovimentacoes : SenacCoinMovimentacao[]; 
  idUsuarioLogado : string;
  value: string;

  constructor(
    private senacCoinService : SenacCoinService, 
    private senacCoinMovimentacao : SenacCoinMovimentacaoService,
    private authGuardService: AuthGuardService ) { }

  ngOnInit(): void {
   
    this.idUsuarioLogado = this.authGuardService.getIdUsuarioLogado();

    this.senacCoinService.ObterSenacCoinPeloUsuarioId(this.idUsuarioLogado).subscribe(resultado =>{
      this.senacCoins = resultado;
      this.loading = false;
    });

    this.senacCoinMovimentacao.ObterSenacCoinMovimentacaoPeloUsuarioId(this.idUsuarioLogado).subscribe(resultado =>{
        this.senacCoinMovimentacoes = resultado;
        this.loading = false;
    }); 

  }
}