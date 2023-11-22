import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheBadgeComponent } from './detalhe-badge.component';

describe('DetalheBadgeComponent', () => {
  let component: DetalheBadgeComponent;
  let fixture: ComponentFixture<DetalheBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalheBadgeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
