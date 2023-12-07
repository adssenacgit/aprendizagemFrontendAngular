import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorInfoGrupoComponent } from './professor-info-grupo.component';

describe('ProfessorInfoGrupoComponent', () => {
  let component: ProfessorInfoGrupoComponent;
  let fixture: ComponentFixture<ProfessorInfoGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorInfoGrupoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorInfoGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
