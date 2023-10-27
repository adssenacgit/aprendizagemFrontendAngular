import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorListaUcComponent } from './professor-lista-uc.component';

describe('ProfessorListaUcComponent', () => {
  let component: ProfessorListaUcComponent;
  let fixture: ComponentFixture<ProfessorListaUcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorListaUcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorListaUcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
