import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarefasUcComponent } from './tarefas-uc.component';

describe('TarefasUcComponent', () => {
  let component: TarefasUcComponent;
  let fixture: ComponentFixture<TarefasUcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TarefasUcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarefasUcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
