import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginEstundateForm } from './login-estundate-form';

describe('LoginEstundateForm', () => {
  let component: LoginEstundateForm;
  let fixture: ComponentFixture<LoginEstundateForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginEstundateForm],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginEstundateForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
