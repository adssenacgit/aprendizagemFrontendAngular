import { Usuario } from "./Usuario";

export class Recurso {
  id:           number;
  descricao:    string;
  nomeArquivo:  string;
  arquivo:      string;
  dataCadastro: string;
  status:       number;
  usuarioId:    string;
}