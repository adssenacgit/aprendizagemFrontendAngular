import { ChapterAssunto } from "./ChapterAssunto";

export interface Comentario {
    id: number;
    texto: String;
    data: String;
    pai: number;
    chapterAssuntoComentarioReferenciaPai: String;
    chapterAssuntoId: number;
    chapterAssunto: ChapterAssunto; 
}
      