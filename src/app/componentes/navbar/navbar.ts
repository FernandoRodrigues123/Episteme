import { CommonModule, isPlatformBrowser } from "@angular/common";
import { Component, computed, inject, OnInit, PLATFORM_ID, signal } from "@angular/core";
import { Router } from "@angular/router";
@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {

  isMenuOpen = false;

  constructor(private router: Router) { }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }
  redirecionarParaCadastro(): void {
    console.log('Redirecionando para cadastro');
    this.router.navigate(['/cadastro-estudante']);
  }
  redirecionarParaLogin(): void {
    console.log('Redirecionando para login');
    this.router.navigate(['/login-estudante']);
  }
  sair(): void {
    localStorage.removeItem('token');

    this.router.navigate(['']);
  }
}