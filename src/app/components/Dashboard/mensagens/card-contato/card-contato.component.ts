import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-contato',
  templateUrl: './card-contato.component.html',
  styleUrls: ['./card-contato.component.css']
})
export class CardContatoComponent implements OnInit {
  @Input() nome: String = "John Doe";
  @Input() msg: String = "Hello, Are you there?";
  @Input() img: String = "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-1.webp";
  @Input() unreaded: number = 1;
  constructor() { }

  ngOnInit(): void {
  }

}
