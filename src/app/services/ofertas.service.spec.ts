import { TestBed } from '@angular/core/testing';

import { OfertasService } from './ofertas.service';

describe('OfertaService', () => {
  let service: OfertasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OfertasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
