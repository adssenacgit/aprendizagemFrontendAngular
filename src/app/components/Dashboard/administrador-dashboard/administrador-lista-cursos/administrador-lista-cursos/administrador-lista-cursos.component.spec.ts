import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradorListaCursosComponent } from './administrador-lista-cursos.component';

describe('AdministradorListaCursosComponent', () => {
  let component: AdministradorListaCursosComponent;
  let fixture: ComponentFixture<AdministradorListaCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdministradorListaCursosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministradorListaCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
