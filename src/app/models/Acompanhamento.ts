import { Badge } from 'src/app/models/Badge';
import { Atividade } from "./Atividade";
import { ObjetoAprendizagem } from "./ObjetoAprendizagem";
import { Participante } from "./Participante";
import { SituacaoAprendizagem } from "./SituacaoAprendizagem";
import { AvaliacaoConceito } from './AvaliacaoConceito';

export class Acompanhamento {
    id: number;
    entrega: string;
    entregaArquivo: string;
    inicio: string;
    finalizacao: string;
    status: number;
    participanteId : number;
    participante : Participante;
    avaliacaoConceitoId : number;
    avaliacaoConceito : AvaliacaoConceito;
    atividadeId : number;
    atividade: Atividade;
    objetoAprendizagemId : number;
    objetoAprendizagem : ObjetoAprendizagem;
    situacaoAprendizagemId: number;
    situacaoAprendizagem: SituacaoAprendizagem;
    badgeId : Number;
    badge : Badge;
    acompanhamentoDataBadge : string;
}