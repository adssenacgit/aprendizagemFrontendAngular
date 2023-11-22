import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalvarConceitoFeedbackComponent } from './salvar-conceito-feedback.component';

describe('FormularioRegistroAvaliacaoComponent', () => {
  let component: SalvarConceitoFeedbackComponent;
  let fixture: ComponentFixture<SalvarConceitoFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalvarConceitoFeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalvarConceitoFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
