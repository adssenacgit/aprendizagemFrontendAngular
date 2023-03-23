import { CursoTipo } from "./CursoTipo";

export class Curso {
    id: number;
    nome: string;
    codigo: string;
    cursoTipoId: number;
    cursoTipo: CursoTipo;
    status: number;
}