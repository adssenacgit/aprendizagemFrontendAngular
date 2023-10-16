import { ChapterAssunto } from "./ChapterAssunto";
import { Usuario } from "./Usuario";

export class ChapterAssuntoComentario {
    id: number;
    texto: string;
    data: string;
    pai: number;
    chapterAssuntoComentarioReferenciaPai: string;
    chapterAssuntoId: number;
    chapterAssunto: ChapterAssunto;
    usuarioId: string;
    usuario: Usuario;
}
      