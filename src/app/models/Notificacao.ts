import {Usuario} from "./Usuario";

export class Notificacao {
  id: number = 0;
  notificacaoTexto: string = "";
  data: Date = new Date();
  status: number = 0;
  usuarioId: number = 0;
  usuario: Usuario = new Usuario();
  usuarioIdAutor: string;
}
