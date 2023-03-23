import { EncontroService } from 'src/app/services/encontro.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Encontro } from 'src/app/models/Encontro';

@Component({
  selector: 'app-timeline-detalhes',
  templateUrl: './timeline-detalhes.component.html',
  styleUrls: ['./timeline-detalhes.component.css'],
})
export class TimelineDetalhesComponent implements OnInit {
  encontro: Encontro | undefined;
  encontros: Encontro[] = [];
  constructor(
    private _route: ActivatedRoute,
    private encontroService: EncontroService
  ) {}

  ngOnInit(): void {
    this.encontroService.ObterEncontros().subscribe((data) => {
      this.encontros = data;
      // First get the product id from the current route.
      const routeParams = this._route.snapshot.paramMap;
      const unidadeCuricularIdFromRoute = Number(routeParams.get('id'));

      // Find the product that correspond with the id provided in route.
      this.encontro = this.encontros.find(
        (data) => data.id === unidadeCuricularIdFromRoute
      );
    });
  }
}