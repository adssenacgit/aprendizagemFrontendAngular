import { AcompanhamentoComentario } from "./AcompanhamentoComentario";
import { Atividade } from "./Atividade";
import { AvaliacaoConceito } from "./AvaliacaoConceito";
import { Badge } from "./Badge";
import { ObjetoAprendizagem } from "./ObjetoAprendizagem";
import { Participante } from "./Participante";
import { SituacaoAprendizagem } from "./SituacaoAprendizagem";


export class Acompanhamento{
    id: number;
    dataInicio: Date;
    dataFim: Date;
    dataBadge: Date;
    status: string;
    participanteId: number;
    participante: Participante;
    avaliacaoConceitoId: number;
    avaliacaoConceito: AvaliacaoConceito;
    atividadeId: number;
    atividade: Atividade;
    objetoAprendizagemId: number;
    objetoAprendizagem: ObjetoAprendizagem;
    situacaoAprendizagemId: number;
    situacaoAprendizagem: SituacaoAprendizagem;
    badgeId: number;
    badge: Badge;
    comentarios: AcompanhamentoComentario;

}