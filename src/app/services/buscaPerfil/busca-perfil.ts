import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Estudante } from '../../model/estudante';

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
