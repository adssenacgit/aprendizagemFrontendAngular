import { Component, OnInit } from '@angular/core';
import { SenacCoin } from 'src/app/models/SenacCoin';
import { SenacCoinMovimentacao } from 'src/app/models/SenacCoinMovimentacao';
import { SenacCoinMovimentacaoService } from 'src/app/services/senac-coin-movimentacao.service';
import { SenacCoinService } from 'src/app/services/senac-coin.service';

@Component({
  selector: 'app-trilha-curso',
  templateUrl: './usuario-trilha-curso.component.html',
  styleUrls: ['./usuario-trilha-curso.component.css']
})
export class UsuarioTrilhaCursoComponent implements OnInit {

  senacCoins : SenacCoin;
  loading: boolean = true;
  senacCoinMovimentacoes : SenacCoinMovimentacao[]; 
  idUsuarioLogado : string;

  constructor(private senacCoinService : SenacCoinService, private senacCoinMovimentacao : SenacCoinMovimentacaoService ) { }

  ngOnInit(): void {
   
    this.idUsuarioLogado = localStorage.getItem("UsuarioId")!;

    this.senacCoinService.ObterSenacCoinPeloUsuarioId(this.idUsuarioLogado).subscribe((resultado:SenacCoin) =>{
      this.senacCoins = resultado;
      this.loading = false;
    });

    this.senacCoinMovimentacao.ObterSenacCoinMovimentacaoPeloUsuarioId(this.idUsuarioLogado).subscribe((resultado:SenacCoinMovimentacao[]) =>{
        this.senacCoinMovimentacoes = resultado;
        this.loading = false;
    }); 

  }
}