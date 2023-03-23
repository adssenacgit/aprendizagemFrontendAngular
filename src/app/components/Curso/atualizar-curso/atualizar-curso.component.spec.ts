import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarCursoComponent } from './atualizar-curso.component';

describe('AtualizarCursoComponent', () => {
  let component: AtualizarCursoComponent;
  let fixture: ComponentFixture<AtualizarCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtualizarCursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtualizarCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
