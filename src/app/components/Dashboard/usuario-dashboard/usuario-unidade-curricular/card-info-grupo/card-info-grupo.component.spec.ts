import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInfoGrupoComponent } from './card-info-grupo.component';

describe('CardInfoGrupoComponent', () => {
  let component: CardInfoGrupoComponent;
  let fixture: ComponentFixture<CardInfoGrupoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardInfoGrupoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardInfoGrupoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
