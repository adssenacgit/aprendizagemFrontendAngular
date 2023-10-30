import { Chapter } from "./Chapter";
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
    totalComentarios: number;
<<<<<<< HEAD
    chapterTag: ChapterTag[];
=======
    tags: ChapterTag[] = [];
>>>>>>> fd597e1 (Front Nova Pergunta funciona)
}
