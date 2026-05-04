import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { appConfig } from './app.config';
import { serverRoutes } from './app.routes.server';
import { SimplemdeConfig } from 'ngx-simplemde';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering(withRoutes(serverRoutes)),

    {
      provide: SimplemdeConfig,
      useValue: {
        spellChecker: false,
        placeholder: 'Escreva seu artigo aqui...',
        toolbar: [
          'bold',
          'italic',
          'heading',
          '|',
          'quote',
          'code',
          '|',
          'unordered-list',
          'ordered-list',
          '|',
          'link',
          'preview'
        ]
      }
    }
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);