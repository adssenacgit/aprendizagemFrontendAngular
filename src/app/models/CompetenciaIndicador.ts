import { Competencia } from "./Competencia";

export class CompetenciaIndicador {
    id: number;
    descricao: string;
    status: string;
    competenciaId: number;
    competencia: Competencia;
    selecionado?: number;
}
