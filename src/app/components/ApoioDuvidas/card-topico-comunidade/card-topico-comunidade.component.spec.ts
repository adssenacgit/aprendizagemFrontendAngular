import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTopicoComunidadeComponent } from './card-topico-comunidade.component';

describe('CardTopicoComunidadeComponent', () => {
  let component: CardTopicoComunidadeComponent;
  let fixture: ComponentFixture<CardTopicoComunidadeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardTopicoComunidadeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardTopicoComunidadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
