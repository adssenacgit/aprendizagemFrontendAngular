import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Encontro } from 'src/app/models/Encontro';


@Component({
  selector: 'app-lista-encontros',
  templateUrl: './encontros.component.html',
  styleUrls: ['./encontros.component.css']
})
export class EncontrosListaComponent implements OnChanges{


  @Input()
  encontros: Encontro[];

  isLoading: boolean = true;

  constructor(
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    // if(this.encontros != undefined) {
    //   console.log(this.encontros)
    // }
  }
}
