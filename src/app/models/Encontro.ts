import { EncontroStatus } from './EncontroStatus';
import { DiaLetivo } from './DiaLetivo';
import { EncontroTipo } from './EncontroTipo';
import { Grupo } from './Grupo';
import { SituacaoAprendizagem } from './SituacaoAprendizagem';
import { Atividade } from './Atividade';

export class Encontro {
	id: number;
	descricao: string;
	horaInicio: Date;
	horaFim: Date;
	local: string;
	status: number;
	diaLetivoId: number;
	diaLetivo: DiaLetivo;
	grupoId: Grupo['id'];
	grupo: Grupo;
	encontroTipoId: EncontroTipo['encontroTipoId'];
	encontroTipo: EncontroTipo;
	encontroStatus: EncontroStatus;
	selecionado: number;
	situacaoAprendizagem: SituacaoAprendizagem[];
	atividades: Atividade[];
	EncontroStatus: any;
}