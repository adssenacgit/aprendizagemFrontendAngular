import { CompetenciaIndicador } from "./CompetenciaIndicador";
import { UnidadeCurricular } from "./UnidadeCurricular";

export class Competencia {
    id: number;
    descricao: string;
    status: string;
    unidadeCurricularId: number;
    unidadeCurricular: UnidadeCurricular;
    competenciaIndicadores: CompetenciaIndicador[];
}
