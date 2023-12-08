import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardComentarioComponent } from './card-comentario.component';

describe('CardComentarioComponent', () => {
  let component: CardComentarioComponent;
  let fixture: ComponentFixture<CardComentarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardComentarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardComentarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
