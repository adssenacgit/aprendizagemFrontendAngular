import { TestBed } from '@angular/core/testing';

import { FuncoesService } from './funcoes.service';

describe('FuncoesService', () => {
  let service: FuncoesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FuncoesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
