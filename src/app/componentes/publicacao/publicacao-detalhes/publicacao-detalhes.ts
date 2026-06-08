import {
  Component,
  OnInit,
  inject,
  signal,
  PLATFORM_ID
} from '@angular/core';

import {
  CommonModule,
  isPlatformBrowser,
  } from '@angular/common';

import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  HttpClient,
  HttpHeaders
} from '@angular/common/http';
@Component({
  selector: 'app-publicacao-detalhes',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './publicacao-detalhes.html',
  styleUrl: './publicacao-detalhes.css'
})
export class PublicacaoDetalhes implements OnInit {

  private platformId = inject(PLATFORM_ID);

  isBrowser = isPlatformBrowser(this.platformId);

  token = signal('');

  publicacao = signal<any | null>(null);

  carregando = signal(true);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit(): void {

    if (!this.isBrowser) return;

    this.token.set(
      localStorage.getItem('token') || ''
    );

    const id = Number(
      this.route.snapshot.paramMap.get('id')
    );

    if (!id) {
      this.router.navigate(['/']);
      return;
    }

    this.buscarPublicacao(id);
  }

  buscarPublicacao(id: number) {

    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token()}`
    });

    this.http.get(
      `http://localhost:8080/publicacoes/${id}`,
      { headers }
    )
    .subscribe({

      next: (res) => {

        this.publicacao.set(res);

        this.carregando.set(false);
      },

      error: (err) => {
        console.error(err);

        this.carregando.set(false);
      }

    });
  }
}