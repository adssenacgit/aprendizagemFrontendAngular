import { Periodo } from "./Periodo";
import { PeriodoDiaTipo } from "./PeriodoDiaTipo";

export class DiaLetivo {
    id: number;
    dialetivo: Date;
    dia: number;
    mes: number;
    ano: number;
    semana: number;
    status: number;
    periodoId: number;
    periodo: Periodo;
    periodoDiaTipoId: number;
    periodoDiaTipo : PeriodoDiaTipo;
}
