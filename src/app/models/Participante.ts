import { Estudante } from "./Estudante";
import { Grupo } from "./Grupo";

export class Participante {
  id: number;
  dataMatricula: Date;
  status: number;
  grupoId: number;
  grupo: Grupo;
  estudanteId: number;
  estudante: Estudante;
}