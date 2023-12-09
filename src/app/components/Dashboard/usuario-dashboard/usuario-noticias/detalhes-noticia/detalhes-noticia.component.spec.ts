import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalhesNoticiaComponent } from './detalhes-noticia.component';

describe('DetalhesNoticiaComponent', () => {
  let component: DetalhesNoticiaComponent;
  let fixture: ComponentFixture<DetalhesNoticiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalhesNoticiaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalhesNoticiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
