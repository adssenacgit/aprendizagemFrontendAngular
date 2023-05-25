import { AvaliacaoConceito } from "./AvaliacaoConceito";
import { AvaliacaoTipo } from "./AvaliacaoTipo";
import { Participante } from "./Participante";

export class RegistroAvaliacao {
  id: number;
  data: Date;
  comentario : string;
  status: number;
  avaliacaoTipoId: number;
  avaliacaoTipo: AvaliacaoTipo;
  participanteId: number;
  participante: Participante;
  avaliacaoConceitoId: number;
  avaliacaoConceito: AvaliacaoConceito;
}