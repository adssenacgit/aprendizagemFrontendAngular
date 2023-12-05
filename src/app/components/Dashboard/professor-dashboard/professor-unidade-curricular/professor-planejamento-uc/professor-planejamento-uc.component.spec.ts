import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorPlanejamentoUcComponent } from './professor-planejamento-uc.component';

describe('ProfessorPlanejamentoUcComponent', () => {
  let component: ProfessorPlanejamentoUcComponent;
  let fixture: ComponentFixture<ProfessorPlanejamentoUcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorPlanejamentoUcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorPlanejamentoUcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
