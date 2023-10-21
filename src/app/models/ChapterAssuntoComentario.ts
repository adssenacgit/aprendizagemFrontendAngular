import { ChapterAssunto } from "./ChapterAssunto";
import { Usuario } from "./Usuario";

export class ChapterAssuntoComentario {
    id: number;
    texto: String;
    data: String;
    pai: number;
    chapterAssuntoComentarioReferenciaPai: String;
    chapterAssuntoId: number;
    chapterAssunto: ChapterAssunto;
    usuarioId: String;
    usuario: Usuario;
}
