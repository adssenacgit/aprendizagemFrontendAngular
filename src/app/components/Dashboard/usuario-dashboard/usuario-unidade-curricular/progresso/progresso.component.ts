import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-progresso',
  templateUrl: './progresso.component.html',
  styleUrls: ['./progresso.component.css']
})
export class ProgressoComponent implements OnInit {

  @Input()
  progressoUC: number;
  @Input()
  progressoAluno: number;

  constructor() { }

  ngOnInit(): void {
  }
}
