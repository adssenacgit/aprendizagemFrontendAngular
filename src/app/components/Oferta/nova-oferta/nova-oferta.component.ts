import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Curso } from 'src/app/models/Curso';
import { CursosService } from 'src/app/services/cursos.service';
import { OfertasService } from 'src/app/services/ofertas.service';

interface Estados {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-nova-oferta',
  templateUrl: './nova-oferta.component.html',
  styleUrls: ['../listagem-ofertas/listagem-ofertas.component.css']
})
export class NovaOfertaComponent implements OnInit {

  formulario: any;
  cursos: Curso[];
  estados : Estados[] = [
    {value: '1', viewValue: 'Ativo'},
    {value: '0', viewValue: 'Inativo'}
  ];

  erros: string[];
  
  constructor(private router: Router,
    private snackBar: MatSnackBar,
    private ofertasService: OfertasService,
    private cursosService: CursosService) { }

  ngOnInit(): void {
    this.erros = [];
    this.cursosService.ObterTodos().subscribe(resultado => {
      this.cursos = resultado;
    });

    this.formulario = new UntypedFormGroup({
      cursoId: new UntypedFormControl(null, [Validators.required]),
      descricao: new UntypedFormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
      codigo: new UntypedFormControl(null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]),
      inicioOperacao: new UntypedFormControl(null, [Validators.required]),
      status: new UntypedFormControl(this.estados[0].value, [Validators.required]),
      usuarioId: new UntypedFormControl(localStorage.getItem('UsuarioId'))
    });
  }

  get propriedade(){
    return this.formulario.controls;
  }

  VoltarListagem(): void {
    this.router.navigate(['/ofertas/listagemofertas']);
  }

  EnviarFormulario(): void {
    const oferta = this.formulario.value;
    this.ofertasService.NovaOferta(oferta).subscribe(
      (resultado) => {
        this.router.navigate(['/ofertas/listagemofertas']);
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
      }
    );
  }
}
