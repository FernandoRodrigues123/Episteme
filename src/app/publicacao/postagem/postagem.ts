import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { SimplemdeModule } from 'ngx-simplemde';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
@Component({
  selector: 'app-postagem',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SimplemdeModule],
  templateUrl: './postagem.html',
  styleUrl: './postagem.css',
  template: `
    <simplemde [(ngModel)]="conteudo"></simplemde>
  `
})
export class Postagem {

  conteudo = '';
  isBrowser = isPlatformBrowser(inject(PLATFORM_ID));


  form;
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.form = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      corpo: ['', [Validators.required, Validators.minLength(20)]],
      referencias:['']
    });
  }

  carregando = false;

  enviar() {
    console.log(this.form.value)
    
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.carregando = true;

    const token = localStorage.getItem('token');
    const login = localStorage.getItem('login');

    this.http.post('http://localhost:8080/publicacoes/' + login, 
      this.form.value, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).subscribe({
      next: () => {
        alert('Publicação criada');
        this.form.reset();
        this.carregando = false;
      },
      error: (err) => {
        console.error(err);
        this.carregando = false;
      }
    });
  }
}