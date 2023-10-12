import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForumUcComponent } from './forum-uc.component';

describe('ForumUcComponent', () => {
  let component: ForumUcComponent;
  let fixture: ComponentFixture<ForumUcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForumUcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForumUcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
