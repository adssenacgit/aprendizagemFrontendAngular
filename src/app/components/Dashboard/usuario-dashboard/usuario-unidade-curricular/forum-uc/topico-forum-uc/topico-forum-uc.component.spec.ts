import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicoForumUcComponent } from './topico-forum-uc.component';

describe('TopicoForumUcComponent', () => {
  let component: TopicoForumUcComponent;
  let fixture: ComponentFixture<TopicoForumUcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicoForumUcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicoForumUcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
