import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface PublicacaoLeituraSemEstudante {
  id: number;
  titulo: string;
  corpo: string;
  referencia: string;
}
export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  last: boolean;
}
export interface Estudante {
  id: number;
  nome: string;
  urlImagem: string | null;
  email: string;
  dataDeNascimento: string;
  areaDeEstudo: string;
  publicacoes: Page<PublicacaoLeituraSemEstudante>;
}
@Injectable({
  providedIn: 'root',
})
export class BuscaPerfil {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/estudantes/';

  buscarPerfil(token: string, login: string): Observable<{ estudante: Estudante }> {

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<{ estudante: Estudante }>(
      this.apiUrl + login,
      { headers }
    );
  }
}
