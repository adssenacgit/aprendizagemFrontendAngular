import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjetoAprendizagemComponent } from './objeto-aprendizagem.component';

describe('ObjetoAprendizagemComponent', () => {
  let component: ObjetoAprendizagemComponent;
  let fixture: ComponentFixture<ObjetoAprendizagemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjetoAprendizagemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjetoAprendizagemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
