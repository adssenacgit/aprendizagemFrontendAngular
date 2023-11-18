import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardObjetoAprendizagemComponent } from './card-objeto-aprendizagem.component';

describe('CardObjetoAprendizagemComponent', () => {
  let component: CardObjetoAprendizagemComponent;
  let fixture: ComponentFixture<CardObjetoAprendizagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardObjetoAprendizagemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardObjetoAprendizagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
