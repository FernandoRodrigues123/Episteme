import { TestBed } from '@angular/core/testing';

import { BuscaPerfil } from './busca-perfil';

describe('BuscaPerfil', () => {
  let service: BuscaPerfil;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuscaPerfil);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
