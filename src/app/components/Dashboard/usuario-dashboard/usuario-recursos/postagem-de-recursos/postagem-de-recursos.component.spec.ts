import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostagemDeRecursosComponent } from './postagem-de-recursos.component';

describe('PostagemDeRecursosComponent', () => {
  let component: PostagemDeRecursosComponent;
  let fixture: ComponentFixture<PostagemDeRecursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostagemDeRecursosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostagemDeRecursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
