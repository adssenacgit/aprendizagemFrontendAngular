import { Chapter } from "./Chapter";
import { Usuario } from "./Usuario";

export class ChapterAssunto {
    id: number;
    descricao: string;
    status: number;
    chapter: Chapter;
    usuario: Usuario;
}