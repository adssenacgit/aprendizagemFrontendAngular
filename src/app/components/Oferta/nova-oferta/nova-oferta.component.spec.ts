import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaOfertaComponent } from './nova-oferta.component';

describe('NovaOfertaComponent', () => {
  let component: NovaOfertaComponent;
  let fixture: ComponentFixture<NovaOfertaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovaOfertaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NovaOfertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
