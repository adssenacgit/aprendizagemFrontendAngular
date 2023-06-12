import { Usuario } from "./Usuario";

export class Mensagem {
  id: number;
  mensagemTexto: string;
  data: String;
  status: number;
  usuarioId: string;
  usuario: Usuario;
  usuarioIdAutor: string;
  usuarioAutor: Usuario;
}
