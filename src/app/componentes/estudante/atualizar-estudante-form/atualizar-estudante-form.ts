import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,ReactiveFormsModule, Validators } from '@angular/forms';
import { Estudante } from '../../../model/estudante';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-atualizar-estudante-form',
  imports: [CommonModule,
    ReactiveFormsModule],
  templateUrl: './atualizar-estudante-form.html',
  styleUrl: './atualizar-estudante-form.css',
})
export class AtualizarEstudanteForm implements OnInit {


  token = localStorage.getItem('token');
  login = localStorage.getItem('login');


  carregando = false;

  form: FormGroup;
  estudante!: Estudante;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {

    this.form = this.fb.group({
      nome: [
        '',
        [
          Validators.required,
          Validators.minLength(5)
        ]
      ],

      email: [
        '',
        [
          Validators.required,
          
        ]
      ],
    
      areaDeEstudo: [
        '',
        [
          Validators.required,
          Validators.minLength(20)
        ]
      ],

      dataDeNascimento: [
        '',
        [
          Validators.required,
        ]
      ],
    });
  }
  async ngOnInit(): Promise<void> {
  
    await this.carregarEstudante().then((res) => {
      this.estudante = res as Estudante;
      this.form.patchValue({
        nome: this.estudante.nome,
        email: this.estudante.email,
        areaDeEstudo: this.estudante.areaDeEstudo,
        dataDeNascimento: this.estudante.dataDeNascimento
      });
    })
    console.log("estudante ", this.estudante);
  }

  enviar() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.carregando = true;
    this.http.put(
      'http://localhost:8080/estudantes/' + this.login,

      this.form.value,

      {
        headers: {
          Authorization: `Bearer ${this.token}`
        }
      }
    ).subscribe({

      next: () => {

        alert('Atualização foi realizada com sucesso!');

        this.form.reset();

        this.carregando = false;
        this.router.navigate(['/perfil']);
      },

      error: (err) => {

        console.error(err);

        this.carregando = false;
      }
    });
  }
  async carregarEstudante(): Promise<Estudante> {

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return new Promise((resolve, reject) => {
      this.http.get<Estudante>(`http://localhost:8080/estudantes`, { headers })
        .subscribe({
          next: (res) => {
            console.log("res ", res);
            resolve(res);
          },
          error: (err) => {
            console.error("Erro ao carregar estudante: ", err);
            reject(err);
          }
        });
    });
  }

}
