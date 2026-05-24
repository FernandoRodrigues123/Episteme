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
