import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemConceitosFeedbacksComponent } from './listagem-conceitos-feedbacks.component';

describe('ListarConceitosComponent', () => {
  let component: ListagemConceitosFeedbacksComponent;
  let fixture: ComponentFixture<ListagemConceitosFeedbacksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemConceitosFeedbacksComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemConceitosFeedbacksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
