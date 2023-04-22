import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Recurso } from 'src/app/models/Recurso';
import { RecursoService } from 'src/app/services/recurso.service';


@Component({
  selector: 'app-novo-recurso',
  templateUrl: './novo-recurso.component.html',
  styleUrls: ['./novo-recurso.component.css']
})
export class NovoRecursoComponent implements OnInit {

  constructor(
    private RecursoService : RecursoService,
   
    private router:Router) {}

  ngOnInit(): void {
  }

  async createHandler(recurso : Recurso){
    const formData = new FormData()
    
    formData.append('nomeArquivo',recurso.nomeArquivo);
    formData.append('descricao',recurso.descricao);

    if (recurso.arquivo){
      formData.append('arquivo',recurso.arquivo);
    }
// enviar par ao service
  await this.RecursoService.postar(formData).subscribe();

 
  this.router.navigate(['/']);
  }


}
