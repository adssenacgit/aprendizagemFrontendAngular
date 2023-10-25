import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConteudoUcComponent } from './conteudo-uc.component';

describe('ConteudoUcComponent', () => {
  let component: ConteudoUcComponent;
  let fixture: ComponentFixture<ConteudoUcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConteudoUcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConteudoUcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
