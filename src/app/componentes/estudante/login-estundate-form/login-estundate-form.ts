import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CadastroEstudante } from '../../../services/cadastro-estudante';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-estundate-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-estundate-form.html',
  styleUrl: './login-estundate-form.css',
})
export class LoginEstundateForm implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private loginServ: CadastroEstudante,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required, Validators.minLength(3)]],
      senha: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  // Getter para facilitar o acesso no template
  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
  if (this.loginForm.valid) {
    const dados = this.loginForm.value;
    
    this.loginServ.login(dados.login, dados.senha).subscribe({
      next: (resposta) => {
        // PEGA O TOKEN AQUI!
        const token = resposta.tokenJWT;
        
        // Salva no localStorage
        localStorage.setItem('token', token);
        localStorage.setItem('login', dados.login) 
        // Redireciona, etc.
        
       this.router.navigate(['/perfil']); 
      },
      error: (erro) => {
        console.error('❌ Erro:', erro);
      }
    });
  }
}

  // Função para logar erros específicos
  logFormErrors(): void {
    Object.keys(this.loginForm.controls).forEach(key => {
      const control = this.loginForm.get(key);
      if (control?.invalid) {
        console.log(`Campo "${key}" inválido:`, control.errors);
      }
    });
  }

  // Função para marcar todos os campos como touched
  markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
    });
  }
}

function waiter(arg0: number) {
  throw new Error('Function not implemented.');
}
