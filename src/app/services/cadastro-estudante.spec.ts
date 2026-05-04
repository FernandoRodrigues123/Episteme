import { TestBed } from '@angular/core/testing';

import { CadastroEstudante } from './cadastro-estudante';

describe('CadastroEstudante', () => {
  let service: CadastroEstudante;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CadastroEstudante);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
