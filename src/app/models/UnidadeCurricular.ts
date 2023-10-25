import { Modulo } from "./Modulo";

export class UnidadeCurricular {
    id: number;
    codigo: string;
    nome: string;
    nomeCurto: string;
    horas: number;
    ordem: number;
    moduloId: number;
    modulo: Modulo;
    status: number;
}
