import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoCursoComponent } from './novo-curso.component';

describe('NovoCursoComponent', () => {
  let component: NovoCursoComponent;
  let fixture: ComponentFixture<NovoCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoCursoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovoCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
