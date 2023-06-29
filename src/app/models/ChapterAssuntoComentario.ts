import { ChapterAssunto } from "./ChapterAssunto";

export class ChapterAssuntoComentario {
    id: number;
    texto: String;
    data: String;
    pai: number;
    chapterAssuntoComentarioReferenciaPai: String;
    chapterAssuntoId: number;
    chapterAssunto: ChapterAssunto;
    usuarioId: String;
}
      