import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemMovimentacoesComponent } from './listagem-movimentacoes.component';

describe('ListagemMovimentacoesComponent', () => {
  let component: ListagemMovimentacoesComponent;
  let fixture: ComponentFixture<ListagemMovimentacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemMovimentacoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemMovimentacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
