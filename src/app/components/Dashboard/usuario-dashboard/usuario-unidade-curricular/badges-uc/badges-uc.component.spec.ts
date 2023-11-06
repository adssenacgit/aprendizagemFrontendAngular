import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BadgesUcComponent } from './badges-uc.component';

describe('BadgesUcComponent', () => {
  let component: BadgesUcComponent;
  let fixture: ComponentFixture<BadgesUcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BadgesUcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BadgesUcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
