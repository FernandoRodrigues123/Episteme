import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { BuscaPerfil } from '../../../services/buscaPerfil/busca-perfil';
import { CommonModule, DatePipe } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { Estudante } from '../../../model/estudante';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css',
})
export class Perfil implements OnInit {
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);

  estudante = signal<Estudante | null>(null);
  login = signal<string>('');
  token = signal<string>('');

  constructor(
    private router: Router,
    private buscaPerfil: BuscaPerfil,
    private http: HttpClient) { }

  ngOnInit(): void {
    if (!this.isBrowser) return;


    this.token.set(localStorage.getItem('token') || '');
    this.login.set(localStorage.getItem('login') || '');
    if (!this.token() || !this.login()) {
      this.router.navigate(['/login']);
      return;
    }

    this.buscaPerfil.buscarPerfil(this.token(), this.login()).subscribe({
      next: (res) => {
        const dados = (res as any).estudante ?? res;
        this.estudante.set(dados);
      },
      error: (err) => console.error(err)
    });
  }

  calcularIdade(data: string): number {
    const hoje = new Date();
    const nasc = new Date(data);
    let idade = hoje.getFullYear() - nasc.getFullYear();
    const m = hoje.getMonth() - nasc.getMonth();

    if (m < 0 || (m === 0 && hoje.getDate() < nasc.getDate())) {
      idade--;
    }

    return idade;
  }
  editarPublicacao(pub: any) {
    this.router.navigate(['/atualizarPublicacao/', pub.id]);
  }
  deletarPublicacao(pub: any) {

    const confirmado = confirm(
      'Tem certeza que deseja deletar esta publicação?'
    );

    if (!confirmado) return;

    this.http.delete(
      `http://localhost:8080/publicacoes/${this.login()}/${pub.id}`,
      {
        headers: {
          Authorization: `Bearer ${this.token()}`
        }
      }
    )
      .subscribe({

        next: () => {
          const estudante = this.estudante();

          if (!estudante) return;

          this.estudante.set({
            ...estudante,
            publicacoes: {
              ...estudante.publicacoes,
              content: estudante.publicacoes.content.filter(
                (p: any) => p.id !== pub.id
              )
            }
          });

        },

        error: (err) => {
          console.error(err);
        }

      });
  }
  novaPublicacao() {
    this.router.navigate(['/publicar']);
  }
  deletarPerfil() {
    const confirmado = confirm(
      'Tem certeza que deseja deletar seu perfil? Esta ação é irreversível.'
    );

    if (!confirmado) return;

    this.http.delete(`http://localhost:8080/estudantes/del`,
      {
        headers: {
          Authorization: `Bearer ${this.token()}`
        }
      }

    ).subscribe({

      next: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('login');
        this.router.navigate(['/']);
      },

      error: (err) => {
        console.error(err);
      }

    });
  }
  editarPerfil() {
    this.router.navigate(['/editarPerfil']);
  }
  handleClick(id:any): void {
    this.router.navigate(['/publicacao/', id]);
  }
}