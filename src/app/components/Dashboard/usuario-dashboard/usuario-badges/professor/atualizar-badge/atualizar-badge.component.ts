import { BadgeRetorno } from '../../../../../../models/DadosRetornoBadge';
import { Component, OnInit, SecurityContext } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscriber } from 'rxjs';
import { Badge } from 'src/app/models/Badge';
import { BadgeNivel } from 'src/app/models/BadgeNivel';
import { BadgeNivelService } from 'src/app/services/badge-nivel.service';
import { BadgeService } from 'src/app/services/badge.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import * as internal from 'stream';

interface Estados {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-atualizar-badge',
  templateUrl: './atualizar-badge.component.html',
  styleUrls: ['../listagem-tabela-badges/listagem-tabela-badges.component.css']
})
export class AtualizarBadgeComponent implements OnInit {

  descricaoBadge: string;
  badgeId: number;
  badge :  Observable<Badge>;
  badgeNivel : BadgeNivel[];
  formulario: any;
  erros : string[];
  estados : Estados[] = [
    {value: '1', viewValue: 'Ativo'},
    {value: '0', viewValue: 'Inativo'}
  ];
  imagem: File;
  im: Uint8Array[];

  constructor(
    private router: Router,
    private route : ActivatedRoute,
    private badgeNivelService : BadgeNivelService,
    private badgeService : BadgeService,
    private snackBar : MatSnackBar,
    private _sanitizer: DomSanitizer
    )
    { }

  ngOnInit(): void {
    this.erros = [];

    this.badgeId = this.route.snapshot.params['id'];

    this.badgeNivelService.ObterTodos().subscribe(resultado => {
      this.badgeNivel = resultado;
    });

    this.badgeService.ObterBadgesPeloId(this.badgeId).subscribe((resultado: BadgeRetorno) =>{
      this.descricaoBadge = resultado.descricao;
      debugger;
      const observable = new Observable((subscriber: Subscriber<any>) => {
        const reader = new FileReader();
        reader.readAsDataURL(resultado.imagem);
      });
      observable.subscribe(d=>{
        this.imagem = d;
      });

      this.formulario = new UntypedFormGroup({
        id: new UntypedFormControl(resultado.id),
        descricao: new UntypedFormControl(resultado.descricao, [Validators.required, Validators.maxLength(150)]),
        imagem: new UntypedFormControl(null, [Validators.required]),
        badgeNivelId: new UntypedFormControl(resultado.badgeNivelId, [Validators.required]),
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
    const badge = this.formulario.value;
    this.erros = [];
    this.badgeService.AtualizarBadge(this.badgeId, badge).subscribe(resultado => {
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
