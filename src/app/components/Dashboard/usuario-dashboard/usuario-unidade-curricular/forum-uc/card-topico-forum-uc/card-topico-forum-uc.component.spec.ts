import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTopicoForumUcComponent } from './card-topico-forum-uc.component';

describe('CardTopicoForumUcComponent', () => {
  let component: CardTopicoForumUcComponent;
  let fixture: ComponentFixture<CardTopicoForumUcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardTopicoForumUcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardTopicoForumUcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
