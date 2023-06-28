import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjudaComponent } from './ajuda.component';

describe('AjudaComponent', () => {
  let component: AjudaComponent;
  let fixture: ComponentFixture<AjudaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjudaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjudaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
