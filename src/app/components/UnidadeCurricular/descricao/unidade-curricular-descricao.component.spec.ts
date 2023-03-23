import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnidadeCurricularDescricaoComponent } from './unidade-curricular-descricao.component';

describe('UnidadeCurricularComponent', () => {
  let component: UnidadeCurricularDescricaoComponent;
  let fixture: ComponentFixture<UnidadeCurricularDescricaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnidadeCurricularDescricaoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnidadeCurricularDescricaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
