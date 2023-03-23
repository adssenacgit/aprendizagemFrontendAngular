import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheTimelineComponent } from './detalhe-timeline.component';

describe('DetalheTimelineComponent', () => {
  let component: DetalheTimelineComponent;
  let fixture: ComponentFixture<DetalheTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalheTimelineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalheTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
