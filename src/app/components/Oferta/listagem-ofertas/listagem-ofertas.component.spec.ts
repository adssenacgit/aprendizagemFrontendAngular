import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemOfertasComponent } from './listagem-ofertas.component';

describe('ListagemOfertasComponent', () => {
  let component: ListagemOfertasComponent;
  let fixture: ComponentFixture<ListagemOfertasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemOfertasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemOfertasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
