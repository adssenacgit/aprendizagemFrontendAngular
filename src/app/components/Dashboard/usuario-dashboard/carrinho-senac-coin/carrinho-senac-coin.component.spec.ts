import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrinhoSenacCoinComponent } from './carrinho-senac-coin.component';

describe('CarrinhoSenacCoinComponent', () => {
  let component: CarrinhoSenacCoinComponent;
  let fixture: ComponentFixture<CarrinhoSenacCoinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarrinhoSenacCoinComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarrinhoSenacCoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
