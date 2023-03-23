import { Usuario } from "./Usuario";

export class Professor {
  id: number;
  status: number;
  usuarioId: string;
  usuario: Usuario = new Usuario();
}