import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Estudante } from '../../model/estudante';
import { Page } from '../../model/publicacao';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pesquisar-estudante',
  imports: [CommonModule],
  templateUrl: './pesquisar-estudante.html',
  styleUrl: './pesquisar-estudante.css',
})
export class PesquisarEstudante implements OnInit { 
  private platformId = inject(PLATFORM_ID);
  isBrowser = isPlatformBrowser(this.platformId);

  estudantePage = signal<Page<Estudante>>({
    content: [],
    totalElements: 0,
    totalPages: 0,
    last: false
  });
  vazio = computed(() => {
    return this.estudantePage().content === null;
  })

  constructor(private http: HttpClient, private router: Router) { }
  token = signal<string>('');

  ngOnInit(): void {
    if (!this.isBrowser) return;
    this.token.set(localStorage.getItem('token') || '');
  }

  buscar(nome: string){
    this.buscarEstudante(nome);
  }

  buscarEstudante(nome: string): void {
    const url = `http://localhost:8080/estudantes/s/${nome}`;
    this.http
      .get<Page<Estudante>>(url, {headers:{
      Authorization: `Bearer ${this.token()}`
    }})
      .subscribe((page: Page<Estudante>) => {
        this.estudantePage.set(page);
      });
  }

}