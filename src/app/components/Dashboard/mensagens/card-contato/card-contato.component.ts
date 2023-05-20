import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-contato',
  templateUrl: './card-contato.component.html',
  styleUrls: ['./card-contato.component.css']
})
export class CardContatoComponent implements OnInit {
  @Input() nome: String;
  @Input() msg: String;
  @Input() img: String;
  @Input() unreaded: number = 0;

  constructor() { }
  print(){
    console.log(this.nome);
  }
  ngOnInit(): void {

  }

}
