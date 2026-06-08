import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroEstudanteForm } from './cadastro-estudante-form';

describe('CadastroEstudanteForm', () => {
  let component: CadastroEstudanteForm;
  let fixture: ComponentFixture<CadastroEstudanteForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastroEstudanteForm],
    }).compileComponents();

    fixture = TestBed.createComponent(CadastroEstudanteForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
