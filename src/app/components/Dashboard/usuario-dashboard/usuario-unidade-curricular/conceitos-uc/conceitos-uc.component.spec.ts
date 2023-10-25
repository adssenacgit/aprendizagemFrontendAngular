import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConceitosUcComponent } from './conceitos-uc.component';

describe('ConceitosUcComponent', () => {
  let component: ConceitosUcComponent;
  let fixture: ComponentFixture<ConceitosUcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConceitosUcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConceitosUcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
