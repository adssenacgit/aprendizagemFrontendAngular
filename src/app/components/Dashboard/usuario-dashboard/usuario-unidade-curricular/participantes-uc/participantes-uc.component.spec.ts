import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantesUcComponent } from './participantes-uc.component';

describe('ParticipantesUcComponent', () => {
  let component: ParticipantesUcComponent;
  let fixture: ComponentFixture<ParticipantesUcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipantesUcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ParticipantesUcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
