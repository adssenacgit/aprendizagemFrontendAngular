import { Chapter } from "./Chapter";
import { Usuario } from "./Usuario";

export class ChapterAssunto {
    id: number;
    titulo:string;
    descricao: string;
    contadorVisualizacao: number;
    status: number; 
    verificacao: number;
    chapterId: number;
    usuarioId: string
    usuarioIdVerificacao: string
    usuario: Usuario
    chapter:Chapter
}