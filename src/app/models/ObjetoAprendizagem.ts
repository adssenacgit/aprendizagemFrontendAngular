import { GrauDificuldade } from "./GrauDificuldade";
import { Usuario } from "./Usuario";

export class ObjetoAprendizagem {
    id: number;
    descricao: string;
    arquivo: string;
    status: number;
    grauDificuldadeId: number;
    grauDificuldade: GrauDificuldade;
    usuarioId: string;
    usuario: Usuario;
}