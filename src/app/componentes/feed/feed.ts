import { Component, OnInit, signal } from '@angular/core';
import { Page, PublicacaoDetalhada } from '../../model/publicacao';
import { HttpClient } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-feed',
  imports: [CommonModule],
  templateUrl: './feed.html',
  styleUrl: './feed.css',
})
export class Feed implements OnInit {
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);

  constructor(private http: HttpClient, private router: Router) { }
  token = signal<string>('');

  publicacaoesPage = signal<Page<PublicacaoDetalhada>>({
    content: [],
    totalElements: 0,
    totalPages: 0,
    last: false
  });

  ngOnInit(): void {


    if (!this.isBrowser) return;

    this.token.set(localStorage.getItem('token') || '');
    if (this.token() != null && this.token().trim() != '') {
      this.carregarPublicacoes();
    } else {
      this.router.navigate(['']);
    }
  }

  carregarPublicacoes(): void {
    this.http.get<Page<PublicacaoDetalhada>>('http://localhost:8080/publicacoes', {
      headers: {
        'Authorization': `Bearer ${this.token()}`
      }
    }).subscribe(
      (response) => {
        this.publicacaoesPage.set(response);
      },
      (error) => {
        console.error('Erro ao carregar publicações:', error);
      }
    );
  }

  handleClick(id:any): void {
    this.router.navigate(['/publicacao/', id]);
  }
}                                                           