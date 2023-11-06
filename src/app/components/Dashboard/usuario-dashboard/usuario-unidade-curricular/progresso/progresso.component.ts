import { Component, Input, OnInit } from '@angular/core';
import { Progresso } from 'src/app/models/Progresso';

@Component({
  selector: 'app-progresso',
  templateUrl: './progresso.component.html',
  styleUrls: ['./progresso.component.css']
})
export class ProgressoComponent implements OnInit {

  @Input()
  progresso: Progresso;

  constructor() { }

  ngOnInit(): void {
  }
}
