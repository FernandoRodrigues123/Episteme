import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Postagem } from './postagem';

describe('Postagem', () => {
  let component: Postagem;
  let fixture: ComponentFixture<Postagem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Postagem],
    }).compileComponents();

    fixture = TestBed.createComponent(Postagem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
