import { GrauDificuldade } from "./GrauDificuldade";
import { Recurso } from "./Recurso";
import { Usuario } from "./Usuario";

export class ObjetoAprendizagem {
    id: number;
    titulo: string;
    descricao: string;
    arquivo: string;
    status: number;
    grauDificuldadeId: number;
    grauDificuldade: GrauDificuldade;
    usuarioId: string;
    usuario: Usuario;
    cursado?: boolean;
    hasArquivo?: boolean;
    recursos: Recurso[]
}
