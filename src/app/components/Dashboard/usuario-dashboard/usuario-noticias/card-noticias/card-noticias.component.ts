import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-noticias',
  templateUrl: './card-noticias.component.html',
  styleUrls: ['./card-noticias.component.css']
})
export class CardNoticiasComponent implements OnInit {
  newsList: any[] = [
    {
      title: 'Notícia 1',
      content: 'Conteúdo da notícia 1...',
      date: '2023-12-01'
    },
    {
      title: 'Notícia 2',
      content: 'Conteúdo da notícia 2...',
      date: '2023-12-02'
    },
    {
      title: 'Notícia 3',
      content: 'Conteúdo da notícia 3...',
      date: '2023-12-03'
    },
    // {
    //   title: 'Notícia 4',
    //   content: 'Conteúdo da notícia 4...',
    //   date: '2023-12-03'
    // }
    // Adicione mais notícias conforme necessário
  ];

  constructor() {}

  ngOnInit(): void {}
}
