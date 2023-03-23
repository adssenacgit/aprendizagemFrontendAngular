import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioListaUcComponent } from './usuario-lista-uc.component';

describe('UsuarioListaUcComponent', () => {
  let component: UsuarioListaUcComponent;
  let fixture: ComponentFixture<UsuarioListaUcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioListaUcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioListaUcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
