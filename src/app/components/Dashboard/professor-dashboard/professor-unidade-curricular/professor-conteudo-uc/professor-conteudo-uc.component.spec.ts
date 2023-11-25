import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorConteudoUcComponent } from './professor-conteudo-uc.component';

describe('ProfessorConteudoUcComponent', () => {
  let component: ProfessorConteudoUcComponent;
  let fixture: ComponentFixture<ProfessorConteudoUcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfessorConteudoUcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfessorConteudoUcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
