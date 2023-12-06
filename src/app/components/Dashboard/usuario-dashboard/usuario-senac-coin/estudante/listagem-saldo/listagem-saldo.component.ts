import {Component, Input, OnInit} from '@angular/core';
import {SenacCoin} from "../../../../../../models/SenacCoin";

@Component({
  selector: 'app-listagem-saldo',
  templateUrl: './listagem-saldo.component.html',
  styleUrls: ['./listagem-saldo.component.css']
})
export class ListagemSaldoComponent implements OnInit {
  @Input() $senacCoins: SenacCoin[] = [];

  constructor() {
  }

  ngOnInit(): void {
  }

}
