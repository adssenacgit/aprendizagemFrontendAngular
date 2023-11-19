import { DadosBadge } from '../../../../../../models/DadoBadge';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, FormControlName, Validators } from '@angular/forms';
import { BadgeService } from 'src/app/services/badge.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar'
import { BadgeNivelService } from 'src/app/services/badge-nivel.service';
import { BadgeNivel } from 'src/app/models/BadgeNivel';
import { Badge } from 'src/app/models/Badge';

interface Estados {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-novo-badge',
  templateUrl: './novo-badge.component.html',
  styleUrls: ['../listagem-tabela-badges/listagem-tabela-badges.component.css']
})
export class NovoBadgeComponent implements OnInit {

  formulario: any;
  badgesNivel : BadgeNivel[];
  estados : Estados[] = [
    {value: '1', viewValue: 'Ativo'},
    {value: '0', viewValue: 'Inativo'}
  ];
  //configuração de erros de validação de entidade
  erros : string [];
  imagem: File;

  constructor(
    private badgeNivelService: BadgeNivelService,
    private badgeService: BadgeService,
    private router: Router,
    private snackBar: MatSnackBar)
    { }

  ngOnInit(): void {
    //configuração de erros de validação de entidade
    this.erros = [];

    this.badgeNivelService.ObterTodos().subscribe(resultado => {
      this.badgesNivel = resultado;
    });

    this.formulario = new UntypedFormGroup({
      descricao: new UntypedFormControl(null, [Validators.required, Validators.maxLength(150)]),
      imagem: new UntypedFormControl(null, [Validators.required]),
      badgeNivelId: new UntypedFormControl(null, [Validators.required]),
      status: new UntypedFormControl(this.estados[0].value)
    });

  }

  get propriedade(){
    return this.formulario.controls;
  }

  EnviarFormulario(): void{

    this.erros = [];
    const badge = this.formulario.value;
    const formData : FormData = new FormData();

    if(this.imagem != null){
      formData.append('file', this.imagem, this.imagem.name);
    }

    this.badgeService.SalvarImagem(formData).subscribe(resultado => {
      const novoBadge: DadosBadge = new DadosBadge();
      novoBadge.descricao = badge.descricao;
      novoBadge.imagem = resultado.imagem;
      novoBadge.status = parseInt(badge.status);
      novoBadge.BadgeNivelId = badge.badgeNivelId;

      this.badgeService.NovoBadge(novoBadge).subscribe((dados) => {
        this.router.navigate(['badges/listagembadges']);
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
    });
  }


  // EnviarFormulario(){
  //   const badge = this.formulario.value;
  //   this.erros = [];
  //   this.badgeService.NovoBadge(badge).subscribe(resultado => {
  //     this.router.navigate(['badges/listagembadges']);
  //     this.snackBar.open(resultado.mensagem, undefined, {
  //       duration: 2000,
  //       horizontalPosition: 'right',
  //       verticalPosition: 'top'
  //     });
  //   },
  //   (err) => {
  //     if (err.status === 400){
  //       for(const campo in err.error.errors)
  //         if(err.error.errors.hasOwnProperty(campo))
  //         {
  //           this.erros.push(err.error.errors[campo]);
  //         }
  //     }
  //   });
  // }

  VoltarListagem() : void
  {
    this.router.navigate(['badges/listagembadges']);
  }

  SelecionarImagem(fileInput: any): void{
    this.imagem = fileInput.target.files[0] as File;
    const reader = new FileReader();
    reader.onload = function(e: any){
      document.getElementById('imagem')?.removeAttribute('hidden');
      document.getElementById('imagem')?.setAttribute('src', e.target.result);
    }
    reader.readAsDataURL(this.imagem);
  }

}
