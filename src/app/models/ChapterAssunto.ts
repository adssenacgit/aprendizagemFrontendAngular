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
    chapterNome: string;
    usuario: Usuario;
    usuarioIdVerificacao: string;
    tags: ChapterTag[] = [];
    comentarios: ChapterAssuntoComentario[] = [];
    totalComentarios: number;
    imagem: string;

}
