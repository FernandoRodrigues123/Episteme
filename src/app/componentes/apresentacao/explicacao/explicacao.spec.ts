import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Explicacao } from './explicacao';

describe('Explicacao', () => {
  let component: Explicacao;
  let fixture: ComponentFixture<Explicacao>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Explicacao],
    }).compileComponents();

    fixture = TestBed.createComponent(Explicacao);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
