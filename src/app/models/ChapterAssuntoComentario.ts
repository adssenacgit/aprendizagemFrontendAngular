import { ChapterAssunto } from "./ChapterAssunto";
import { Curtida } from "./Curtida";
import { Usuario } from "./Usuario";

export class ChapterAssuntoComentario {
    id: number;
    texto: string;
    data: string;
    pai: number;
    comentarioPai: ChapterAssuntoComentario;
    chapterAssuntoComentarioReferenciaPai: string;
    chapterAssuntoId: number;
    chapterAssunto: ChapterAssunto;
    usuario: Usuario;
    curtidas: Curtida[];
    filhos?: ChapterAssuntoComentario[];
}
