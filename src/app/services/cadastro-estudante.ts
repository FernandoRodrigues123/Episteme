import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface CadastroData {
  nome: string;
  dataDeNascimento?: string;
  areaDeEstudo?: string;
  email: string;
  usuario: {
    login: string;
    senha: string;
  };
}

export interface EstudanteResponse {
  id: number;
  nome: string;
  email: string;
  // adicione outros campos conforme sua resposta
}

@Injectable({
  providedIn: 'root',
})
export class CadastroEstudante {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/estudantes/cadastro';

  constructor() { }

  cadastrar(dados: CadastroData, imagem?: File): Observable<EstudanteResponse> {
    const formData = new FormData();
    
    // Adiciona os dados como JSON string
    formData.append('dados', new Blob([JSON.stringify(dados)], { 
      type: 'application/json' 
    }));
    
    // Adiciona a imagem se existir
    if (imagem) {
      formData.append('imagem', imagem, imagem.name);
    }
    
    return this.http.post<EstudanteResponse>(this.apiUrl, formData);
  }

 login(login: string, senha: string): Observable<{tokenJWT: string}> {
  console.log('Login:', login);
  console.log('Senha:', senha);
  
  return this.http.post<{tokenJWT: string}>('http://localhost:8080/estudantes/login', {
    login: login,
    senha: senha
  });
}
}