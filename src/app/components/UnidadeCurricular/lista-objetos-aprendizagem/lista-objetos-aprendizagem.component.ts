import { ObjetoAprendizagemService } from './../../../services/objetoaprendizagem.service';
import { ObjetoAprendizagem } from 'src/app/models/ObjetoAprendizagem';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-lista-objetos-aprendizagem',
  templateUrl: './lista-objetos-aprendizagem.component.html',
  styleUrls: ['./lista-objetos-aprendizagem.component.css'],
})
export class ListaObjetosAprendizagem implements OnInit {

    events: any[];
    objetosAprendizagem: any[];

    constructor(
        private objetoAprendizagemService : ObjetoAprendizagemService
    ) {}

    ngOnInit(): void {

        this.events = [
            { status: 'Ordered', date: '15/10/2020 10:30', icon: 'pi pi-shopping-cart', color: '#9C27B0', image: 'game-controller.jpg' },
            { status: 'Processing', date: '15/10/2020 14:00', icon: 'pi pi-cog', color: '#673AB7' },
            { status: 'Shipped', date: '15/10/2020 16:15', icon: 'pi pi-shopping-cart', color: '#FF9800' },
            { status: 'Delivered', date: '16/10/2020 10:00', icon: 'pi pi-check', color: '#607D8B' }
        ];

        this.objetoAprendizagemService.FiltrarObjetoAprendizagemPorSituacaoAprendizagemId(2).subscribe((data)=>{
            this.objetosAprendizagem = data;
            console.log(data);
        });

    //this.encontroService.ObterEncontros().subscribe((data) => {
    //  this.encontros = data;      
    //  const routeParams = this._route.snapshot.paramMap;
    //  const unidadeCuricularIdFromRoute = Number(routeParams.get('id'));

    //});
    }
}