import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDocenteComponent } from './info-docente.component';

describe('InfoDocenteComponent', () => {
  let component: InfoDocenteComponent;
  let fixture: ComponentFixture<InfoDocenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoDocenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoDocenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
