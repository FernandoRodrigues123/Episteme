import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Atualizacao } from './atualizacao';

describe('Atualizacao', () => {
  let component: Atualizacao;
  let fixture: ComponentFixture<Atualizacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Atualizacao],
    }).compileComponents();

    fixture = TestBed.createComponent(Atualizacao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
