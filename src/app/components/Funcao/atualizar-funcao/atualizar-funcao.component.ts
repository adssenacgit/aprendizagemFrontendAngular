import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncoesService } from 'src/app/services/funcoes.service';

@Component({
  selector: 'app-atualizar-funcao',
  templateUrl: './atualizar-funcao.component.html',
  styleUrls: ['../listagem-funcoes/listagem-funcoes.component.css']
})
export class AtualizarFuncaoComponent implements OnInit {

  nomeFuncao: string;
  funcaoId: string;  
  formulario: any;
  erros: string [];

  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private funcoesService: FuncoesService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.erros =[];
    this.funcaoId = this.route.snapshot.params['id'];

    this.funcoesService.ObterFuncaoById(this.funcaoId).subscribe(resultado =>{
      this.nomeFuncao = resultado.name;

      this.formulario = new UntypedFormGroup({
        id : new UntypedFormControl(resultado.id),
        name : new UntypedFormControl(resultado.name, [Validators.required, Validators.maxLength(50)]),
        descricao : new UntypedFormControl(resultado.descricao, [Validators.required, Validators.maxLength(50)])
      });
    });
  }

  get propriedade()
  {
    return this.formulario.controls;
  }

  EnviarFormulario(): void 
  {
    const funcao = this.formulario.value;
    this.erros = [];    
    this.funcoesService.AtualizarFuncao(this.funcaoId, funcao).subscribe(resultado =>{
      this.VoltarListagem();
      this.snackBar.open(resultado.mensagem, undefined, {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    },
    err => {
      if(err.status === 400){
        for(const campo in err.error.errors){
          if(err.error.errors.hasOwnProperty(campo))
          {
            this.erros.push(err.error.errors[campo]);
          }
        }
      }
    });
  }

  VoltarListagem(): void
  {
    this.router.navigate(['funcoes/listagemfuncoes']);
  }
}
