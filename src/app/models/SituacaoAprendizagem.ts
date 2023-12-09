import { Atividade } from './Atividade';
import { Badge } from './Badge';
import { GrauDificuldade } from './GrauDificuldade';
import { ObjetoAprendizagem } from './ObjetoAprendizagem';
import { PlanejamentoUC } from './PlanejamentoUC';

export class SituacaoAprendizagem {
    id: number;
    titulo: string;
    descricao: string;
    duracao: number = 10;
    ordem: number;
    status: number;
    planejamentoUCId: number;
    planejamentoUC: PlanejamentoUC;
    grauDificuldadeId: number;
    grauDificuldade:GrauDificuldade;
    badgeId: number;
    badge:Badge
    objetosAprendizagem!: ObjetoAprendizagem[];
    atividades!: Atividade[];
    selecionado? : number;
}
