import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarRegistrosAvaliacoesComponent } from './listar-registros-avaliacoes.component';

describe('ListarConceitosComponent', () => {
  let component: ListarRegistrosAvaliacoesComponent;
  let fixture: ComponentFixture<ListarRegistrosAvaliacoesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarRegistrosAvaliacoesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarRegistrosAvaliacoesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
