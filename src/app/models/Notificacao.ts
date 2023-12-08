import {Usuario} from "./Usuario";

export class Notificacao {
  constructor(id: number, notificacaoTexto: string, data: Date, status: number, usuarioId: number, usuario: Usuario, usuarioIdAutor: string) {
    this.id = id;
    this.notificacaoTexto = notificacaoTexto;
    this.data = data;
    this.status = status;
    this.usuarioId = usuarioId;
    this.usuario = usuario;
    this.usuarioIdAutor = usuarioIdAutor;
  }


  id: number = 0;
  notificacaoTexto: string = "";
  data: Date = new Date();
  status: number = 0;
  usuarioId: number = 0;
  usuario: Usuario = new Usuario();
  usuarioIdAutor: string;
}
