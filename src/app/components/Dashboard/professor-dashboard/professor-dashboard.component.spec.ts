import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorDashboardComponent } from './professor-dashboard.component';

describe('ProfessorDashboardComponent', () => {
  let component: ProfessorDashboardComponent;
  let fixture: ComponentFixture<ProfessorDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
