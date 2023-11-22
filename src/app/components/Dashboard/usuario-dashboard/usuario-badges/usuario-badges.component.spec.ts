import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuarioBadgesComponent } from './usuario-badges.component';

describe('UsuarioBadgesComponent', () => {
  let component: UsuarioBadgesComponent;
  let fixture: ComponentFixture<UsuarioBadgesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsuarioBadgesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuarioBadgesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
