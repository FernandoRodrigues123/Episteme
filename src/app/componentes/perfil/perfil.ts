import { Component, OnInit, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { BuscaPerfil } from '../../services/buscaPerfil/busca-perfil';
import { CommonModule, DatePipe } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { Estudante } from '../../model/estudante';

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

  constructor(
    private router: Router,
    private buscaPerfil: BuscaPerfil
  ) { }

  ngOnInit(): void {
    if (!this.isBrowser) return;

    const token = localStorage.getItem('token');
    const login = localStorage.getItem('login');
    if (!token || !login) {
      this.router.navigate(['/login']);
      return;
    }

    this.buscaPerfil.buscarPerfil(token, login).subscribe({
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
}