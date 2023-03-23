import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Curso } from 'src/app/models/Curso';
import { CursoTipo } from 'src/app/models/CursoTipo';
import { CursoTiposService } from 'src/app/services/curso-tipos.service';
import { CursosService } from 'src/app/services/cursos.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Estados {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-atualizar-curso',
  templateUrl: './atualizar-curso.component.html',
  styleUrls: ['../listagem-cursos/listagem-cursos.component.css']
})
export class AtualizarCursoComponent implements OnInit {

  nomeCurso: string;
  cursoId: number;
  curso :  Observable<Curso>;
  tiposCurso : CursoTipo[];
  formulario: any;
  erros : string[];
  estados : Estados[] = [
    {value: '1', viewValue: 'Ativo'},
    {value: '0', viewValue: 'Inativo'}
  ];
  
  constructor(
    private router: Router,
    private route : ActivatedRoute,
    private cursoTipoSevice : CursoTiposService,
    private cursoService : CursosService,
    private snackBar : MatSnackBar
    ) 
    { }

  ngOnInit(): void {
    this.erros = [];

    this.cursoId = this.route.snapshot.params['id'];
    
    this.cursoTipoSevice.ObterTodos().subscribe(resultado => {
      this.tiposCurso = resultado;
    });

    this.cursoService.ObterCursoById(this.cursoId).subscribe(resultado =>{
      this.nomeCurso = resultado.nome;

      this.formulario = new UntypedFormGroup({
        id: new UntypedFormControl(resultado.id),
        nome: new UntypedFormControl(resultado.nome, [Validators.required, Validators.maxLength(150)]),
        codigo: new UntypedFormControl(resultado.codigo, [Validators.required, Validators.maxLength(15)]),
        cursoTipoId: new UntypedFormControl(resultado.cursoTipoId, [Validators.required]),
        status: new UntypedFormControl(resultado.status.toString())
      });
    });
  }

  get propriedade()
  {
    return this.formulario.controls;
  }

  EnviarFormulario(): void
  {
    const curso = this.formulario.value;
    this.erros = [];
    this.cursoService.AtualizarCurso(this.cursoId, curso).subscribe(resultado => {
      this.VoltarListagem();
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
