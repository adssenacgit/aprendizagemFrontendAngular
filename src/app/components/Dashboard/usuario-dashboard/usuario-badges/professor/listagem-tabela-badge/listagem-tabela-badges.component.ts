import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { BadgeService } from 'src/app/services/badge.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntypedFormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listagem-tabela-badges',
  templateUrl: './listagem-tabela-badges.component.html',
  styleUrls: ['./listagem-tabela-badges.component.css']
})
export class ListagemTabelaBadgesComponent implements OnInit {

  badges = new MatTableDataSource<any>();
  displayedColumns: string[];

  //Fitragem de cursos
  autoCompleteInput = new UntypedFormControl();
  opcoesBadges : string[] = [];
  descricaoBadges : Observable<string[]>;

  //Paginação da tabela
  @ViewChild(MatPaginator, {static: true}) paginator : MatPaginator;
  //Ordenação da tabela
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private badgeService: BadgeService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    this.badgeService.ObterTodos().subscribe(resultado => {
        //para a busqueda
        console.log(resultado);
        resultado.forEach((badge) => {
          this.opcoesBadges.push(badge.descricao);
        });

        this.badges.data = resultado;
        //para a paginação
        this.badges.paginator = this.paginator;
        //para a ordenação
        this.badges.sort = this.sort;
    });

    this.displayedColumns = this.ExibirColunas();

    //pipe função para transformação de dados
    this.descricaoBadges = this.autoCompleteInput.valueChanges.pipe(
      startWith(''),
      map((descricao) => this.FiltrarDescricao(descricao))
    );
  }

  ExibirColunas(): string[]{
    return ['id', 'descricao', 'imagem', 'badgeNivel','acoes'];
  }

  AbrirDialog(id : any, descricao: any): void
  {
    this.dialog.open(DialogExclusaoBadgeComponent, {
      data: {
        id: id,
        descricao: descricao
      }
    }).afterClosed().subscribe(resultado =>{
      if(resultado === true){
        this.badgeService.ObterTodos().subscribe(dados => {
          this.badges.data = dados;
        });
        this.displayedColumns = this.ExibirColunas();
      }
    });
  }

  FiltrarDescricao(descricao: string): string[]
  {
    if(descricao.trim().length >= 4)
    {
      this.badgeService.FiltrarBadges(descricao.toLowerCase()).subscribe(resultado =>{
        this.badges.data = resultado;
      })
    }
    else
    {
      if (descricao === '')
      {
        this.badgeService.ObterTodos().subscribe(resultado => {
          this.badges.data = resultado;
        });
      }
    }

    return this.opcoesBadges.filter(badge =>
      badge.toLowerCase().includes(descricao.toLowerCase())
    );
  }

}


@Component({
  selector: 'app-dialog-exclusao-badge',
  templateUrl: './dialog-exclusao-badge.html'
})

export class DialogExclusaoBadgeComponent{
  constructor(
    @Inject(MAT_DIALOG_DATA) public dados: any,
    private badgeService: BadgeService,
    private snackBar : MatSnackBar
    ) { }

  ExcluirBadge(id: any): void
  {
    console.log(id);
    this.badgeService.ExcluirBadge(id).subscribe(resultado => {
      this.snackBar.open(resultado.mensagem, undefined, {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    });
  }
}
