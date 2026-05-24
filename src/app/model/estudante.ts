
import { Page, Publicacao } from "./publicacao";

export interface Estudante {
  id: number;
  nome: string;
  urlImagem: string | null;
  email: string;
  dataDeNascimento: string;
  areaDeEstudo: string;
  publicacoes: Page<Publicacao>;
}
