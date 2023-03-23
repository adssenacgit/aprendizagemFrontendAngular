import { DiaLetivo } from './../../../../../models/DiaLetivo';
import { Component, OnInit } from '@angular/core';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { DiaLetivoService } from 'src/app/services/dia-letivo.service';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

@Component({
  selector: 'app-usuario-calendario-academico',
  templateUrl: './usuario-calendario-academico.component.html',
  styleUrls: ['./usuario-calendario-academico.component.css']
})
export class UsuarioCalendarioAcademicoComponent implements OnInit {

  idUsuarioLogado : string;
  cdiasLetivos: DiaLetivo[];
  loading: boolean = true;

  minDate: any =  "2022-08-01T18:30:00.000Z"; 
  maxDate: any =  "2022-12-30T18:30:00.000Z";

  diasLetivos     : Date[]= [];
  inicioPeriodo   : Date[]= [];
  terminoPeriodo  : Date[]= [];  
  diasFeriados    : Date[]= [];
  sabadoLetivo    : Date[]= [];
  diasNaoLetivos  : Date[]= [];
  recessoInstitucional  : Date[]= [];

  constructor(
    private diaLetivoService: DiaLetivoService,
    private authGuardService: AuthGuardService
  ) { }

  ngOnInit(): void {
    
    this.idUsuarioLogado = this.authGuardService.getIdUsuarioLogado();
    this.diaLetivoService.ObterCalendarioSemestreAtualByUsuarioId(this.idUsuarioLogado).subscribe(resultado => {
      this.cdiasLetivos = resultado;

      this.minDate = this.cdiasLetivos[0].dialetivo;
      this.maxDate = this.cdiasLetivos[this.cdiasLetivos.length-1].dialetivo;

      this.cdiasLetivos .forEach(dia => {
          if(dia.periodoDiaTipoId == 1){
            this.diasLetivos.push(dia.dialetivo);
          }else if(dia.periodoDiaTipoId == 2){
            this.inicioPeriodo.push(dia.dialetivo);
          }else if(dia.periodoDiaTipoId == 3){
            this.terminoPeriodo.push(dia.dialetivo);
          }else if(dia.periodoDiaTipoId == 4){
            this.diasFeriados.push(dia.dialetivo);
          }else if(dia.periodoDiaTipoId == 5){
            this.sabadoLetivo.push(dia.dialetivo);
          }else if(dia.periodoDiaTipoId == 6){
            this.diasNaoLetivos.push(dia.dialetivo);
          }else if(dia.periodoDiaTipoId == 7){
            this.recessoInstitucional.push(dia.dialetivo);
          }
        }
      )
      this.loading = false;
    }); 

    // this.diasLetivos = [new Date('12/01/2022'), new Date('12/02/2022'), new Date('12/05/2022'), new Date('12/06/2022'), new Date('12/07/2022'), new Date('12/08/2022'), new Date('12/09/2022'), new Date('12/12/2022'), new Date('12/13/2022'), new Date('12/14/2022'), new Date('12/15/2022')];
    // this.inicioPeriodo = [new Date('11/01/2022'),new Date('12/16/2022')];
    // this.terminoPeriodo = [new Date('11/01/2022'),new Date('12/16/2022')];    
    // this.diasFeriados = [new Date('12/25/2022')];
    // this.sabadoLetivo = [new Date('12/03/2022'),new Date('12/10/2022'),new Date('12/17/2022')];
    // this.diasNaoLetivos = [new Date('12/25/2022')];
    // this.recessoInstitucional = [new Date('12/05/2022')];
  }

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      const letivo = this.diasLetivos
        .map(strDate => new Date(strDate))
        .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());
      const inicio = this.inicioPeriodo
        .map(strDate => new Date(strDate))
        .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());
      const termino = this.terminoPeriodo
        .map(strDate => new Date(strDate))
        .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());        
      const feriado = this.diasFeriados
        .map(strDate => new Date(strDate))
        .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());
      const sabado = this.sabadoLetivo
        .map(strDate => new Date(strDate))
        .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());
      const naoletivo = this.diasLetivos
        .map(strDate => new Date(strDate))
        .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());
      const recesso = this.recessoInstitucional
        .map(strDate => new Date(strDate))
        .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());
      
        if (feriado){
          return 'dia-feriado' ;
        }
        else if (letivo){
          return 'dia-letivo' ;          
        }
        else if (naoletivo){
          return 'dia-nao-letivo' ;          
        }        
        else if (inicio){
          return 'inicio-periodo' ;          
        }                
        else if (termino){
          return 'termino-periodo' ;          
        }         
        else if (sabado){
          return 'sabado-letivo' ;          
        }
        else if (recesso){
          return 'recesso-institucional' ;          
        }        
        else{
          return '';
        }

        
      // const highlightDate = this.datesToHighlight
      //   .map(strDate => new Date(strDate))
      //   .some(d => d.getDate() === date.getDate() && d.getMonth() === date.getMonth() && d.getFullYear() === date.getFullYear());
      //return highlightDate ? 'special-date' : '';
    };
  }

}
