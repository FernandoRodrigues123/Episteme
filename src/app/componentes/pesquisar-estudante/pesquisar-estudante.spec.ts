import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisarEstudante } from './pesquisar-estudante';

describe('PesquisarEstudante', () => {
  let component: PesquisarEstudante;
  let fixture: ComponentFixture<PesquisarEstudante>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PesquisarEstudante],
    }).compileComponents();

    fixture = TestBed.createComponent(PesquisarEstudante);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
