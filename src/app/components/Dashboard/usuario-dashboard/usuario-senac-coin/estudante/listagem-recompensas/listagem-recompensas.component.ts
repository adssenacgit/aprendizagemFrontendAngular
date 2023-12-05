import {Component, Input} from '@angular/core';
import {SenacCoin} from 'src/app/models/SenacCoin';
import {SenacCoinRecompensa} from "../../../../../../models/SenacCoinRecompensa";

@Component({
  selector: 'app-listagem-recompensas',
  templateUrl: './listagem-recompensas.component.html',
  styleUrls: ['./listagem-recompensas.component.css'],
})
export class ListagemRecompensasComponent {
  @Input() $senacCoins: SenacCoin[] = [];
  @Input() $senacCoinRecompensas: SenacCoinRecompensa[] = [];
}
