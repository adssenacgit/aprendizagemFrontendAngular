import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovoRecursoComponent } from './novo-recurso.component';

describe('NovoRecursoComponent', () => {
  let component: NovoRecursoComponent;
  let fixture: ComponentFixture<NovoRecursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovoRecursoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovoRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
