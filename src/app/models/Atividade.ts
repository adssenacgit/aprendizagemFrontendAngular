import { AtividadeTipo } from "./AtividadeTipo";
import { GrauDificuldade } from "./GrauDificuldade";
import { SituacaoAprendizagem } from "./SituacaoAprendizagem";

export class Atividade {
    id: number;
    descricao: string;
    dataInicio: string;
    dataFim: string;
    duracao: number;
    ordem: number;
    status: number;
    situacaoAprendizagemId: number;
    situacaoAprendizagem: SituacaoAprendizagem;
    atividadeTipoId: number;
    atividadeTipo: AtividadeTipo;
    grauDificuldadeId: number;
    grauDificuldade: GrauDificuldade;
    enunciado !: String | null;
    alternativas !: String[] | null;
}