import {Component, Input, OnInit} from '@angular/core';
import {SenacCoinMovimentacao} from "../../../../../../models/SenacCoinMovimentacao";

@Component({
  selector: 'app-listagem-movimentacoes',
  templateUrl: './listagem-movimentacoes.component.html',
  styleUrls: ['./listagem-movimentacoes.component.css']
})
export class ListagemMovimentacoesComponent implements OnInit {
  @Input() $isLoading: boolean = false;
  @Input() $senacCoinMovimentacoes: SenacCoinMovimentacao[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
