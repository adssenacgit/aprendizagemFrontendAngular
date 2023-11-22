import { ChapterAssunto } from "./ChapterAssunto";
import { Curtida } from "./Curtida";
import { Usuario } from "./Usuario";

export class ChapterAssuntoComentario {
    id: number;
    texto: string;
    data: string;
    paiId: number;
    chapterAssuntoComentarioReferenciaPai: string;
    chapterAssuntoId: number;
    chapterAssunto: ChapterAssunto;
    usuario: Usuario;
    curtidas: Curtida[];
    filhos?: ChapterAssuntoComentario[];
}
