import { Component } from '@angular/core';
import { NgForOf } from "../../../../../node_modules/@angular/common/types/_common_module-chunk";

@Component({
  selector: 'app-ferramentas',
  templateUrl: './ferramentas.html',
  styleUrl: './ferramentas.css',
})
export class Ferramentas {
  // Array de recursos
  recursos = [
    {
      icone: 'bi bi-book',
      titulo: 'Publicações Revisadas',
      descricao: 'Compartilhe suas pesquisas com garantia de qualidade através de revisão colaborativa pela comunidade.'
    },
    {
      icone: 'bi bi-people',
      titulo: 'Grupos de Pesquisa',
      descricao: 'Crie ou participe de grupos focados em áreas específicas do conhecimento e colaboração.'
    },
    {
      icone: 'bi bi-chat-dots',
      titulo: 'Debates Acadêmicos',
      descricao: 'Participe de discussões aprofundadas sobre temas relevantes com especialistas da área.'
    },
    {
      icone: 'bi bi-calendar-event',
      titulo: 'Eventos Científicos',
      descricao: 'Descubra e participe de congressos, simpósios e workshops ao redor do mundo.'
    },
    {
      icone: 'bi bi-journal-code',
      titulo: 'Repositório de Dados',
      descricao: 'Compartilhe conjuntos de dados e metodologias para replicação e avanço da ciência.'
    },
    {
      icone: 'bi bi-award',
      titulo: 'Reconhecimento',
      descricao: 'Ganhe visibilidade e reconhecimento por suas contribuições à comunidade acadêmica.'
    }
  ];

 
  tituloSecao = 'Recursos que elevam o conhecimento';
  subtituloSecao = 'Ferramentas desenvolvidas especificamente para acadêmicos que valorizam rigor e acessibilidade';
}