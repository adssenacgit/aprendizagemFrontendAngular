import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.component.html',
  styleUrls: ['./mensagens.component.css']
})
export class MensagensComponent implements OnInit {
  list = [1,2,3,4,5];
  constructor() { }

  ngOnInit(): void {
  }

}
