
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Rodape } from "./componentes/rodape/rodape";
import { Navbar } from "./componentes/navbar/navbar";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Rodape, Navbar], 
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('unialunos');
}