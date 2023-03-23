import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioDashboardComponent } from './usuario-dashboard.component';

describe('UsuarioDashboardComponent', () => {
  let component: UsuarioDashboardComponent;
  let fixture: ComponentFixture<UsuarioDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioDashboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
