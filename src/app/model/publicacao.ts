import { EstudanteSlim } from "./estudante";


export interface Publicacao {
  id?: number;
  titulo: string;
  corpo: string;
  referencias: string;
}
export interface Page<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  last: boolean;
}
export interface PublicacaoDetalhada {
  id?: number;
  titulo: string;
  corpo: string;
  referencias: string;
  estudante: EstudanteSlim;
  estudantesLikes: EstudanteSlim[];                                     
}