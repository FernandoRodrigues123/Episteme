import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtualizarEstudanteForm } from './atualizar-estudante-form';

describe('AtualizarEstudanteForm', () => {
  let component: AtualizarEstudanteForm;
  let fixture: ComponentFixture<AtualizarEstudanteForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtualizarEstudanteForm],
    }).compileComponents();

    fixture = TestBed.createComponent(AtualizarEstudanteForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
