import { Acompanhamento } from "./Acompanhamento";


export class AcompanhamentoComentario {
    id: number;
    comentario: string;
    data: string;
    status: number;
    acompanhamentoId: number;
    acompanhamento : Acompanhamento;
}