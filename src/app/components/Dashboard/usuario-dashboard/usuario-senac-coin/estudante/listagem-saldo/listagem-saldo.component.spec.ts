import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemSaldoComponent } from './listagem-saldo.component';

describe('ListagemSaldoComponent', () => {
  let component: ListagemSaldoComponent;
  let fixture: ComponentFixture<ListagemSaldoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemSaldoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemSaldoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
