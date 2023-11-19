import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursoDocViewerComponent } from './recurso-doc-viewer.component';

describe('RecursoDocViewerComponent', () => {
  let component: RecursoDocViewerComponent;
  let fixture: ComponentFixture<RecursoDocViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecursoDocViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecursoDocViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
