import { ChapterAssunto } from "./ChapterAssunto";
import { Curtida } from "./Curtida";
import { Usuario } from "./Usuario";

export class ChapterAssuntoComentario {
    id: number;
    texto: string;
    data: Date;
    paiId: number;
    chapterAssuntoComentarioReferenciaPai: string;
    comentarioPai: ChapterAssuntoComentario;
    chapterAssuntoId: number;
    chapterAssunto: ChapterAssunto;
    usuarioId: string;
    usuario: Usuario;
    curtidas: Curtida[];
    filhos?: ChapterAssuntoComentario[];
}
