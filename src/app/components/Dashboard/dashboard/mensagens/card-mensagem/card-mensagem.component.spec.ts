import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardMensagemComponent } from './card-mensagem.component';

describe('CardMensagemComponent', () => {
  let component: CardMensagemComponent;
  let fixture: ComponentFixture<CardMensagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardMensagemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardMensagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
