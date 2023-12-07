import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemRecompensasComponent } from './listagem-recompensas.component';

describe('CardsSenacCoinComponent', () => {
  let component: ListagemRecompensasComponent;
  let fixture: ComponentFixture<ListagemRecompensasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemRecompensasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListagemRecompensasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
