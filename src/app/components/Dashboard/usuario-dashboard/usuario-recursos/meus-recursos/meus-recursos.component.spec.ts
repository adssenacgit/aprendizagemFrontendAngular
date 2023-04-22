import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusRecursosComponent } from './meus-recursos.component';

describe('MeusRecursosComponent', () => {
  let component: MeusRecursosComponent;
  let fixture: ComponentFixture<MeusRecursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeusRecursosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MeusRecursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
