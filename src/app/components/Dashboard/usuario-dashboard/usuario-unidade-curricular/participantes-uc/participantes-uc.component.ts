import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Estudante } from 'src/app/models/Estudante';
import { EstudantesService } from 'src/app/services/estudante.service';
import { GrupoService } from 'src/app/services/grupo.service';

@Component({
  selector: 'app-participantes-uc',
  templateUrl: './participantes-uc.component.html',
  styleUrls: ['./participantes-uc.component.css']
})

export class ParticipantesUcComponent implements OnInit {
  participantes: Estudante[];
  grupoId: number;


  constructor(
    private grupoService: GrupoService,
    private estudanteService: EstudantesService,
    private route : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.grupoId = this.grupoService.getGrupoId()
    if(this.grupoId != undefined){
      this.estudanteService.ObterEstudanteByGrupoId(this.grupoId)
        .subscribe({
          next: (res => {
            this.participantes = res
          })
        })

    }
  }

}
