import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-convite',
  imports: [],
  templateUrl: './convite.html',
  styleUrl: './convite.css',
})
export class Convite {

  constructor(private router: Router) { }
  redirecionarParaCadastro(): void {
    this.router.navigate(['/cadastro-estudante'])
  }
}
