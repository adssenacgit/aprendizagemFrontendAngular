import { Periodo } from "./Periodo";
import { PeriodoDiaTipo } from "./PeriodoDiaTipo";

export class DiaLetivo {
    id: number;
    dialetivo: Date;
    status: number;
    periodoId: number;
    periodo: Periodo;
    periodoDiaTipoId: number;
    periodoDiaTipo : PeriodoDiaTipo;
}