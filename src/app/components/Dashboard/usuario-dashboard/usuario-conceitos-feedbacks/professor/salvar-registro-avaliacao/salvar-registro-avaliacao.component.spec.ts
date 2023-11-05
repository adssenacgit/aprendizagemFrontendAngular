import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalvarRegistroAvaliacaoComponent } from './salvar-registro-avaliacao.component';

describe('FormularioRegistroAvaliacaoComponent', () => {
  let component: SalvarRegistroAvaliacaoComponent;
  let fixture: ComponentFixture<SalvarRegistroAvaliacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalvarRegistroAvaliacaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalvarRegistroAvaliacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
