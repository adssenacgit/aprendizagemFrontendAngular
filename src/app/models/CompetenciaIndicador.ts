import { Competencia } from "./Competencia";
import { ObjetoAprendizagem } from "./ObjetoAprendizagem";

export class CompetenciaIndicador {
    id: number;
    descricao: string;
    status: string;
    competenciaId: number;
    competencia: Competencia;
    selecionado?: number;
    objetosAprendizagem?: ObjetoAprendizagem[];
}
