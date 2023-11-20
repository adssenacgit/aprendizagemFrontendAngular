import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorUnidadeCurricularComponent } from './professor-unidade-curricular.component';

describe('ProfessorUnidadeCurricularComponent', () => {
  let component: ProfessorUnidadeCurricularComponent;
  let fixture: ComponentFixture<ProfessorUnidadeCurricularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorUnidadeCurricularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorUnidadeCurricularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
