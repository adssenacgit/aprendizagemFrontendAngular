import { UnidadeCurricular } from "./UnidadeCurricular";

export class Bibliografia {
    id: number;
    nome: string;
    status: number;
    unidadeCurricularId: number;
    unidadeCurricular: UnidadeCurricular;
}
