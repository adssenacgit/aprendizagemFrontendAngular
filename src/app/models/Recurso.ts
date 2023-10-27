import { Usuario } from "./Usuario";

export class Recurso {
  id:           number;
  descricao:    string;
  nomeArquivo:  string;
  arquivo:      string;
  mimeType: string;
  dataCadastro: string;
  status:       number;
  tamanho: number;
  usuarioId:    string;
}
