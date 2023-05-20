import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.component.html',
  styleUrls: ['./mensagens.component.css']
})
export class MensagensComponent implements OnInit {
  list = [
    {
      nome: "John Doe",
      msg : "Hello, Are you there?",
      img : "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-1.webp",
      unreaded : 0
    },
    {
      nome: "John Doe",
      msg : "Hello, Are you there?",
      img : "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-1.webp",
      unreaded : 1
    },
    {
      nome: "John Doe",
      msg : "Hello, Are you there?",
      img : "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-1.webp",
      unreaded : 1
    }
  ];

  fav = [
    {
      nome: "Jhonny",
      msg : "Hello, Are you there?",
      img : "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-1.webp",
      unreaded : 0
    },
    {
      nome: "mckenzie",
      msg : "Hello, Are you there?",
      img : "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-1.webp",
      unreaded : 1
    }
  ];

  group = [
    {
      nome: "Jhonny",
      msg : "Hello, Are you there?",
      img : "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-1.webp",
      unreaded : 0
    },
    {
      nome: "mckenzie",
      msg : "Hello, Are you there?",
      img : "https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-1.webp",
      unreaded : 1
    }
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
