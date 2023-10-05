import { Component, Input, OnInit } from '@angular/core';
import { Professor } from 'src/app/models/Professor';

@Component({
  selector: 'app-info-docente',
  templateUrl: './info-docente.component.html',
  styleUrls: ['./info-docente.component.css']
})
export class InfoDocenteComponent implements OnInit {

  @Input() professor: Professor;

  constructor() { }

  ngOnInit(): void {
  }

}
