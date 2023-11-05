import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-salvar-registro-avaliacao',
  templateUrl: './salvar-registro-avaliacao.component.html',
  styleUrls: ['./salvar-registro-avaliacao.component.css']
})
export class SalvarRegistroAvaliacaoComponent implements OnInit {
  @Input() $isProfessor: boolean = false;
  formGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this._formMount();
  }


  private _formMount(): void {
    this.formGroup = this._formBuilder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
  }

  onSubmit(): void {
    console.log(this.formGroup.value);
  }

}
