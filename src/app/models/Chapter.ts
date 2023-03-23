import { ChapterAssunto } from "./ChapterAssunto";
import { Usuario } from "./Usuario";

export class Chapter {
    id: number;
    nome: string;
    descricao: string;
    status: number;
    usuario: Usuario;
    chapterAssuntos: ChapterAssunto[];
}