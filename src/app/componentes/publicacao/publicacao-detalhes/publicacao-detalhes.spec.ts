import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicacaoDetalhes } from './publicacao-detalhes';

describe('PublicacaoDetalhes', () => {
  let component: PublicacaoDetalhes;
  let fixture: ComponentFixture<PublicacaoDetalhes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PublicacaoDetalhes],
    }).compileComponents();

    fixture = TestBed.createComponent(PublicacaoDetalhes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
