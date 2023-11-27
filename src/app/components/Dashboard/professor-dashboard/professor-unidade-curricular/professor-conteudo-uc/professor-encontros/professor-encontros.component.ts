import { Component, Input, OnInit } from '@angular/core';
import { Encontro } from 'src/app/models/Encontro';
import { DataService } from 'src/app/services/data-service.service';

@Component({
  selector: 'app-professor-encontros',
  templateUrl: './professor-encontros.component.html',
  styleUrls: ['./professor-encontros.component.css']
})
export class ProfessorEncontrosComponent implements OnInit {

  @Input()
  encontros: Encontro[]

  constructor(
    private dataService: DataService,
  ) { }

  ngOnInit(): void {
    this.dataService.setDataSource(null);
  }

  obterAcompanhamento(encontro: Encontro){
    console.log('obterAcompanhamento')

  }
}
