import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ferramentas } from './ferramentas';

describe('Ferramentas', () => {
  let component: Ferramentas;
  let fixture: ComponentFixture<Ferramentas>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ferramentas],
    }).compileComponents();

    fixture = TestBed.createComponent(Ferramentas);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
