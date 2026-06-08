import { Component, OnInit } from '@angular/core';
import { Introducao } from "./introducao/introducao";
import { Ferramentas } from "./ferramentas/ferramentas";
import { Explicacao } from "./explicacao/explicacao";
import { Convite } from "./convite/convite";

@Component({
  selector: 'app-apresentacao',
  imports: [Introducao, Ferramentas, Explicacao, Convite],
  templateUrl: './apresentacao.html',
  styleUrl: './apresentacao.css',
})
export class Apresentacao  {

  

}