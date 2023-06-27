import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsSenacCoinComponent } from './cards-senac-coin.component';

describe('CardsSenacCoinComponent', () => {
  let component: CardsSenacCoinComponent;
  let fixture: ComponentFixture<CardsSenacCoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsSenacCoinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardsSenacCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});