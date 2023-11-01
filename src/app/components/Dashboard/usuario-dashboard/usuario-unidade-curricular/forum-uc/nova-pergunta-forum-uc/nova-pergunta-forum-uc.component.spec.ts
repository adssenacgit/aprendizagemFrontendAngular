import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaPerguntaForumUcComponent } from './nova-pergunta-forum-uc.component';

describe('NovaPerguntaForumUcComponent', () => {
  let component: NovaPerguntaForumUcComponent;
  let fixture: ComponentFixture<NovaPerguntaForumUcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NovaPerguntaForumUcComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovaPerguntaForumUcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
