import { Component, OnInit } from '@angular/core';
import { CursoTipo } from 'src/app/models/CursoTipo';
import { CursoTiposService } from 'src/app/services/curso-tipos.service';
import { UntypedFormGroup, UntypedFormControl, FormControlName, Validators } from '@angular/forms';
import { CursosService } from 'src/app/services/cursos.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'

interface Estados {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-novo-curso',
  templateUrl: './novo-curso.component.html',
  styleUrls: ['../listagem-cursos/listagem-cursos.component.css']
})
export class NovoCursoComponent implements OnInit {

  formulario: any;
  tiposCurso : CursoTipo[];
  estados : Estados[] = [
    {value: '1', viewValue: 'Ativo'},
    {value: '0', viewValue: 'Inativo'}
  ];
  //configuração de erros de validação de entidade
  erros : string [];

  constructor(
    private tiposCursoService: CursoTiposService, 
    private cursoService: CursosService,
    private router: Router,
    private snackBar: MatSnackBar) 
    { }

  ngOnInit(): void {
    //configuração de erros de validação de entidade
    this.erros = [];

    this.tiposCursoService.ObterTodos().subscribe(resultado => {
      this.tiposCurso = resultado;
    });

    this.formulario = new UntypedFormGroup({
      nome: new UntypedFormControl(null, [Validators.required, Validators.maxLength(150)]),
      codigo: new UntypedFormControl(null, [Validators.required, Validators.maxLength(15)]),
      cursoTipoId: new UntypedFormControl(null, [Validators.required]),
      status: new UntypedFormControl(this.estados[0].value)
    });
    
  }

  get propriedade(){
    return this.formulario.controls;
  }

  EnviarFormulario(){
    const curso = this.formulario.value;
    this.erros = [];
    this.cursoService.NovoCurso(curso).subscribe(resultado => {
      this.router.navigate(['cursos/listagemcursos']);
      this.snackBar.open(resultado.mensagem, undefined, { 
        duration: 2000, 
        horizontalPosition: 'right',
        verticalPosition: 'top'        
      });
    },
    (err) => {
      if (err.status === 400){
        for(const campo in err.error.errors)
          if(err.error.errors.hasOwnProperty(campo))
          {
            this.erros.push(err.error.errors[campo]);
          }
      }
    });
  }

  VoltarListagem() : void
  {
    this.router.navigate(['cursos/listagemcursos']);
  }
}
