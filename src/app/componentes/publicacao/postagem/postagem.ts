import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  Component,
  inject,
  PLATFORM_ID
} from '@angular/core';

import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  FormGroup
} from '@angular/forms';

import { HttpClient } from '@angular/common/http';
import { SimplemdeModule } from 'ngx-simplemde';

import { Publicacao } from '../../../model/publicacao'
@Component({
  selector: 'app-postagem',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SimplemdeModule
  ],
  templateUrl: './postagem.html',
  styleUrl: './postagem.css'
})
export class Postagem {

  private platformId = inject(PLATFORM_ID);

  isBrowser = isPlatformBrowser(this.platformId);

  carregando = false;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) {

    this.form = this.fb.group({
      titulo: [
        '',
        [
          Validators.required,
          Validators.minLength(5)
        ]
      ],

      corpo: [
        '',
        [
          Validators.required,
          Validators.minLength(20)
        ]
      ],

      referencias: ['']
    });
  }

  enviar() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.carregando = true;

    if (!this.isBrowser) return;

    const token = localStorage.getItem('token');
    const login = localStorage.getItem('login');

    const publicacao: Publicacao = {
      titulo: this.form.value.titulo,
      corpo: this.form.value.corpo,
      referencias: this.form.value.referencias
    };

    console.log(publicacao);

    this.http.post(
      'http://localhost:8080/publicacoes/' + login,
      publicacao,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).subscribe({

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