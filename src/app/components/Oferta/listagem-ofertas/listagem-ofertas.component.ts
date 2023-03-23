import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { UntypedFormControl } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { map, Observable, startWith } from 'rxjs';
import { OfertasService } from 'src/app/services/ofertas.service';

@Component({
  selector: 'app-listagem-ofertas',
  templateUrl: './listagem-ofertas.component.html',
  styleUrls: ['./listagem-ofertas.component.css']
})
export class ListagemOfertasComponent implements OnInit {

  ofertas = new MatTableDataSource<any>();
  displayedColumns: string[];
  usuarioId: string;
  autoCompleteInput = new UntypedFormControl();
  opcoesOfertas: string [] = [];
  descricaoOfertas: Observable<string[]>;

  @ViewChild(MatPaginator, { static: true })
  paginator: MatPaginator;

  @ViewChild(MatSort, { static: true })
  sort: MatSort;

  constructor(private ofertasService: OfertasService, private dialog: MatDialog) { }

  ngOnInit(): void {
    usuarioId: localStorage.getItem('UsuarioId');

    this.ofertasService.ObterOfertasPeloCursoId(1).subscribe(resultado => {
      resultado.forEach(oferta => {
        this.opcoesOfertas.push(oferta.descricao);
      });
      this.ofertas.data = resultado;
      this.ofertas.paginator = this.paginator;
      this.ofertas.sort = this.sort;
    });

    this.displayedColumns = this.ExibirColunas();

    this.descricaoOfertas = this.autoCompleteInput.valueChanges.pipe(
      startWith(''), 
      map(descricao => this.FiltrarDescricao(descricao))
    );

  }

  ExibirColunas(): string[] {
    return ['codigo', 'descricao', 'inicioOperacao', 'status', 'acoes'];
  }

  FiltrarDescricao(descricaoOferta: string): string[]{
    if(descricaoOferta.trim().length >= 2){
      this.ofertasService.FiltrarOferta(descricaoOferta.toLocaleLowerCase()).subscribe(resultado => {
        this.ofertas.data = resultado;
      });
    }else{
      if(descricaoOferta === ''){
        this.ofertasService.ObterOfertasPeloCursoId(1).subscribe(resultado => {
          this.ofertas.data = resultado;
        });
      }
    }

    return this.opcoesOfertas.filter(oferta => oferta.toLocaleLowerCase());
  }

  AbrirDialog(ofertaId: any, descricao: any): void{
    this.dialog.open(DialogExclusaoOfertasComponent, {
      data: {
        ofertaId: ofertaId,
        descricao: descricao
      }
    })
    .afterClosed().subscribe(resultado => {
      if(resultado === true){
        this.ofertasService.ObterOfertasPeloCursoId(1).subscribe(registros => {
          this.ofertas.data = registros;
          this.ofertas.paginator = this.paginator;
          this.ofertas.sort = this.sort;
        });
        this.displayedColumns = this.ExibirColunas();
      }
    });
  }
}


@Component({
  selector: 'app-dialog-exclusao-ofertas',
  templateUrl: 'dialog-exclusao-ofertas.html'
})
export class DialogExclusaoOfertasComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ofertasService: OfertasService,
    private snackBar: MatSnackBar
  ){}

  ExcluirOferta(ofertaId: any): void {
    this.ofertasService.ExcluirOferta(ofertaId).subscribe(resultado => {
      this.snackBar.open(resultado.mensagem, undefined, {
        duration: 2000,
        horizontalPosition: 'right',
        verticalPosition: 'top'
      });
    });
  }

}