import { ChapterAssuntoComentario } from './ChapterAssuntoComentario';
import { Usuario } from './Usuario';

export class Curtida {
  id: number;
  rank: number;
  chapterAssuntoComentarioId: number;
  chapterAssuntoComentario: ChapterAssuntoComentario;
  usuarioId: string;
  usuario: Usuario;
}
