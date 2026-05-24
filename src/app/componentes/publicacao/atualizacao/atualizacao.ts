import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, inject, Input, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Publicacao } from '../../../model/publicacao';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { sign } from 'crypto';
@Component({
  selector: 'app-atualizacao',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './atualizacao.html',
  styleUrl: './atualizacao.css',
})
export class Atualizacao implements OnInit {

  token = localStorage.getItem('token');

  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);

  idFromURI!: number;
  publicacao!: Publicacao;

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
  async ngOnInit(): Promise<void> {
    this.idFromURI = Number(window.location.href.split('/').pop());
    await this.carregarPublicacao().then((res) => {
      this.publicacao = res as Publicacao;
      this.form.patchValue({
        titulo: this.publicacao.titulo,
        corpo: this.publicacao.corpo,
        referencias: this.publicacao.referencias
      });
    })
    console.log("publicacao ", this.publicacao);
  }

  enviar() {

    //vou mexe
  }

  async carregarPublicacao(): Promise<Publicacao> {

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return new Promise((resolve, reject) => {
      this.http.get<Publicacao>(`http://localhost:8080/publicacoes/${this.idFromURI}`, { headers })
        .subscribe({
          next: (res) => {
            console.log("res ", res);
            resolve(res);
          },
          error: (err) => {
            console.error("Erro ao carregar publicação: ", err);
            reject(err);
          }
        });
    });
  }
}