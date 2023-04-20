import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApoioDuvidasComponent } from './apoio-duvidas.component';

describe('ApoioDuvidasComponent', () => {
  let component: ApoioDuvidasComponent;
  let fixture: ComponentFixture<ApoioDuvidasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApoioDuvidasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApoioDuvidasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
