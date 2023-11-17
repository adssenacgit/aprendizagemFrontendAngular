import { Chapter } from "./Chapter";
import { ChapterAssuntoComentario } from "./ChapterAssuntoComentario";
import { ChapterTag } from "./ChapterTag";
import { Usuario } from "./Usuario";

export class ChapterAssunto {
    id: number;
    dataCadastro: Date;
    titulo:string;
    descricao: string;
    contadorVisualizacao: number;
    status: number;
    verificacao: number;
    chapterId: number;
    usuarioId: string
    usuarioIdVerificacao: string
    usuario: Usuario = new Usuario();
    chapter:Chapter = new Chapter();
    tags: ChapterTag[] = [];
    comentarios: ChapterAssuntoComentario[] = [];



}
