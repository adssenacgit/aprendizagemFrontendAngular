import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardAvisoComponent } from './card-aviso.component';

describe('CardAvisoComponent', () => {
  let component: CardAvisoComponent;
  let fixture: ComponentFixture<CardAvisoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CardAvisoComponent]
    });
    fixture = TestBed.createComponent(CardAvisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
