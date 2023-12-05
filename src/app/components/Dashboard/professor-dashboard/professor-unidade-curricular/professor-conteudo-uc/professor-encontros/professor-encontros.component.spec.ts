import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorEncontrosComponent } from './professor-encontros.component';

describe('ProfessorEncontrosComponent', () => {
  let component: ProfessorEncontrosComponent;
  let fixture: ComponentFixture<ProfessorEncontrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorEncontrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorEncontrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
