import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioUnidadeCurricularComponent } from './usuario-unidade-curricular.component';

describe('UsuarioUnidadeCurricularComponent', () => {
  let component: UsuarioUnidadeCurricularComponent;
  let fixture: ComponentFixture<UsuarioUnidadeCurricularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioUnidadeCurricularComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioUnidadeCurricularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
