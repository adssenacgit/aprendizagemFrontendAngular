import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/models/Curso';
import { Oferta } from 'src/app/models/Oferta';
import { CursosService } from 'src/app/services/cursos.service';
import { OfertasService } from 'src/app/services/ofertas.service';

interface Estados {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-atualizar-oferta',
  templateUrl: './atualizar-oferta.component.html',
  styleUrls: ['../listagem-ofertas/listagem-ofertas.component.css']
})
export class AtualizarOfertaComponent implements OnInit {

  oferta: Observable<Oferta>;
  formulario: any;
  cursos: Curso[];
  estados : Estados[] = [
    {value: '1', viewValue: 'Ativo'},
    {value: '0', viewValue: 'Inativo'}
  ];
  erros: string[];
  ofertaId: number;

  constructor(private ofertasService: OfertasService, 
    private cursosService: CursosService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.erros = [];
    this.ofertaId = this.route.snapshot.params['id'];
    this.cursosService.ObterTodos().subscribe(resultado => {
      this.cursos = resultado;
    });

    this.ofertasService.ObterOfertasPeloId(this.ofertaId).subscribe(resultado => {
      var pipe = new DatePipe('en-US');
      var dataInicioOperacao = pipe.transform(resultado.inicioOperacao, 'yyyy-MM-dd');

      this.formulario = new UntypedFormGroup({
        ofertaId: new UntypedFormControl(resultado.id),
        cursoId: new UntypedFormControl(resultado.cursoId, [Validators.required]),
        descricao: new UntypedFormControl(resultado.descricao, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
        codigo: new UntypedFormControl(resultado.codigo, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
        inicioOperacao: new UntypedFormControl(dataInicioOperacao, [Validators.required]),
        status: new UntypedFormControl(resultado.status.toString(), [Validators.required])
      })
    })
  }
  
  get propriedade(){
    return this.formulario.controls;
  }

  EnviarFormulario(): void{
    this.erros = [];
    const oferta = this.formulario.value;
    this.ofertasService.AtualizarOferta(this.ofertaId, oferta).subscribe(resultado =>{
      this.router.navigate(['ofertas/listagemofertas']);
      this.snackBar.open(resultado.mensagem, undefined, {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    },
    err => {
      if(err.status === 400){
        for(const campo in err.error.errors){
          if(err.error.errors.hasOwnProperty(campo)){
            this.erros.push(err.error.errors[campo]);
          }
        }        
      }
    });
  }

  VoltarListagem(): void {
    //this.formulario.controls['data'].setValue("123");
    this.router.navigate(['ofertas/listagemofertas']);
  }
}
