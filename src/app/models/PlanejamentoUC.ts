import { Grupo } from "./Grupo";

export class PlanejamentoUC {
    id: number;
    descricao: string;
    dataAprovacao: Date;
    status: string;
    grupoId: number;
    grupo: Grupo;
}
