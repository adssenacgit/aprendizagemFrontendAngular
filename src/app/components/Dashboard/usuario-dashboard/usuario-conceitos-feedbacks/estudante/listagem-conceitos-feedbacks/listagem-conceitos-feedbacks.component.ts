import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {RegistroAvaliacao} from "../../../../../../models/RegistroAvaliacao";
import {Atividade} from "../../../../../../models/Atividade";

@Component({
  selector: 'app-listagem-conceitos-feedbacks',
  templateUrl: './listagem-conceitos-feedbacks.component.html',
  styleUrls: ['./listagem-conceitos-feedbacks.component.css']
})
export class ListagemConceitosFeedbacksComponent implements OnInit {
  isDialogVisibleFeedback: boolean = false;
  isDialogVisibleAtividade: boolean = false;
  feedback: string = "";

  @Input() $isEstudante: boolean = false;
  @Input() $atividades: Atividade[] = [];
  @Input() $registrosAvaliacoes: { [key: string]: RegistroAvaliacao[] } = {};

  constructor() {
  }

  ngOnInit(): void {
  }

  showDialogAtividade(feedback: string): void {
    this.feedback = feedback;
    this.isDialogVisibleAtividade = true;
  }

  showDialogFeedback(feedback: string): void {
    this.feedback = feedback;
    this.isDialogVisibleFeedback = true;
  }

}
