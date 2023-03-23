import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { CursosService } from 'src/app/services/cursos.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UntypedFormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listagem-cursos',
  templateUrl: './listagem-cursos.component.html',
  styleUrls: ['./listagem-cursos.component.css']
})
export class ListagemCursosComponent implements OnInit {

  cursos = new MatTableDataSource<any>();
  displayedColumns: string[];

  //Fitragem de cursos
  autoCompleteInput = new UntypedFormControl();
  opcoesCursos : string[] = [];
  nomesCursos : Observable<string[]>;
  
  //Paginação da tabela
  @ViewChild(MatPaginator, {static: true}) paginator : MatPaginator;
  //Ordenação da tabela
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private cursosService: CursosService, 
    private dialog: MatDialog 
    ) { }

  ngOnInit(): void {
    this.cursosService.ObterTodos().subscribe(resultado => {
        //para a busqueda
        console.log(resultado);
        resultado.forEach((curso) => {
          this.opcoesCursos.push(curso.nome);          
        });

        this.cursos.data = resultado;
        //para a paginação
        this.cursos.paginator = this.paginator;
        //para a ordenação
        this.cursos.sort = this.sort;
    });

    this.displayedColumns = this.ExibirColunas();

    //pipe função para transformação de dados
    this.nomesCursos = this.autoCompleteInput.valueChanges.pipe(
      startWith(''),
      map((nome) => this.FiltrarNomes(nome))
    );
  }

  ExibirColunas(): string[]{
    return ['id', 'nome', 'codigo', 'cursoTipo','acoes'];
  }

  AbrirDialog(id : any, nome: any): void 
  {
    this.dialog.open(DialogExclusaoCursosComponent, {
      data: {
        id: id,
        nome: nome
      }
    }).afterClosed().subscribe(resultado =>{
      if(resultado === true){
        this.cursosService.ObterTodos().subscribe(dados => {
          this.cursos.data = dados;
        });
        this.displayedColumns = this.ExibirColunas();
      }
    });
  }

  FiltrarNomes(nome: string): string[]
  {
    if(nome.trim().length >= 4)
    {
      this.cursosService.FiltrarCursos(nome.toLowerCase()).subscribe(resultado =>{
        this.cursos.data = resultado;
      })
    } 
    else
    {
      if (nome === '')
      {
        this.cursosService.ObterTodos().subscribe(resultado => {
          this.cursos.data = resultado;
        });
      }
    }

    return this.opcoesCursos.filter(curso =>
      curso.toLowerCase().includes(nome.toLowerCase())
    );
  }

}


@Component({
  selector: 'app-dialog-exclusao-cursos',
  templateUrl: './dialog-exclusao-cursos.html'
})
export class DialogExclusaoCursosComponent{
  constructor(
    @Inject(MAT_DIALOG_DATA) public dados: any,
    private cursoService: CursosService,
    private snackBar : MatSnackBar
    ) { }

  ExcluirCurso(id: any): void
  {
    console.log(id);
    this.cursoService.ExcluirCurso(id).subscribe(resultado => {
      this.snackBar.open(resultado.mensagem, undefined, { 
        duration: 2000, 
        horizontalPosition: 'right',
        verticalPosition: 'top'        
      });
    });
  }
}