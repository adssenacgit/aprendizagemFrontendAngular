import { Curso } from "./Curso";

export class Oferta {
    id : number;
    descricao: string;
    codigo: string;
    inicioOperacao: Date;
    status: number;
    cursoId: number;
    curso: Curso;
}