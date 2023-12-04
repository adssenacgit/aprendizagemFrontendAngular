import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Participante } from 'src/app/models/Participante';
import { EstudantesService } from 'src/app/services/estudante.service';
import { GrupoService } from 'src/app/services/grupo.service';
import { ParticipanteService } from 'src/app/services/participante.service';

@Component({
  selector: 'app-participantes-uc',
  templateUrl: './participantes-uc.component.html',
  styleUrls: ['./participantes-uc.component.css']
})

export class ParticipantesUcComponent implements OnInit {
  participantes: Participante[];
  grupoId: number;


  constructor(
    private grupoService: GrupoService,
    private participanteService: ParticipanteService,
    private route : ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.grupoId = this.grupoService.getGrupoId()
    if(this.grupoId != undefined){
      this.participanteService.obterParticipantesPorGrupoIdJava(this.grupoId)
        .subscribe({
          next: (res => {
            this.participantes = res
            console.log(this.participantes)
          })
        })

    }
  }

}
