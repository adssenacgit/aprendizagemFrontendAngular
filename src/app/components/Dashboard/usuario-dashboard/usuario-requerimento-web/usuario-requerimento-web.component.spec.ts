import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioRequerimentoWebComponent } from './usuario-requerimento-web.component';

describe('UsuarioRequerimentoWebComponent', () => {
  let component: UsuarioRequerimentoWebComponent;
  let fixture: ComponentFixture<UsuarioRequerimentoWebComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioRequerimentoWebComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioRequerimentoWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
