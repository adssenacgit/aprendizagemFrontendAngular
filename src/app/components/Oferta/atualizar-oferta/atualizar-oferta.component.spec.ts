import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarOfertaComponent } from './atualizar-oferta.component';

describe('AtualizarOfertaComponent', () => {
  let component: AtualizarOfertaComponent;
  let fixture: ComponentFixture<AtualizarOfertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AtualizarOfertaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AtualizarOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
