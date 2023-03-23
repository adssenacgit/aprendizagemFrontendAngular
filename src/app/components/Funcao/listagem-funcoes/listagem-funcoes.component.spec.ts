import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemFuncoesComponent } from './listagem-funcoes.component';

describe('ListagemFuncoesComponent', () => {
  let component: ListagemFuncoesComponent;
  let fixture: ComponentFixture<ListagemFuncoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemFuncoesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemFuncoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
