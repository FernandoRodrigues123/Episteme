import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-introducao',
  imports: [],
  templateUrl: './introducao.html',
  styleUrl: './introducao.css',
})
export class Introducao {
    constructor(private router: Router) { }
  redirecionarParaCadastro(): void {
    this.router.navigate(['/cadastro-estudante'])
  }
}
