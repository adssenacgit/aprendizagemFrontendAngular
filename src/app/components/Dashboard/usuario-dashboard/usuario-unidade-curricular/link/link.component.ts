import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {

  links: string[] = ['Aulas', 'Tarefas', 'Conceitos', 'Fórum', 'Competências', 'Participantes', 'Badges']

  @Input() link: string;


  constructor() { }

  ngOnInit(): void {
  }

}
