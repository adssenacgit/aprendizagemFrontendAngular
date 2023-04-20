import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaperguntaComponent } from './novapergunta.component';

describe('NovaperguntaComponent', () => {
  let component: NovaperguntaComponent;
  let fixture: ComponentFixture<NovaperguntaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovaperguntaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovaperguntaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
