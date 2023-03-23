import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListagemCursosComponent } from './listagem-cursos.component';

describe('ListagemCursosComponent', () => {
  let component: ListagemCursosComponent;
  let fixture: ComponentFixture<ListagemCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListagemCursosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListagemCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
