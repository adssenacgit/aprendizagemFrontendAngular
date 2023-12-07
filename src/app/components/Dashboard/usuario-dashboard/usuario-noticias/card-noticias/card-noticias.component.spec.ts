import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardNoticiasComponent } from './card-noticias.component';

describe('CardNoticiasComponent', () => {
  let component: CardNoticiasComponent;
  let fixture: ComponentFixture<CardNoticiasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardNoticiasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardNoticiasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
