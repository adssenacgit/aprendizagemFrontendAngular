import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioCalendarioAcademicoComponent } from './usuario-calendario-academico.component';

describe('UsuarioCalendarioAcademicoComponent', () => {
  let component: UsuarioCalendarioAcademicoComponent;
  let fixture: ComponentFixture<UsuarioCalendarioAcademicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioCalendarioAcademicoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioCalendarioAcademicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
