import { Acompanhamento } from "./Acompanhamento";

export class AcompanhamentoComentario {
    id: number;
    comentario: string;
    data: Date;
    status: string;
    acompanhamentoId: number;
    acompanhamento: Acompanhamento;
    
}
