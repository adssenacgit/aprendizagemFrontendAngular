import { Oferta } from "./Oferta";
import { UnidadeCurricular } from "./UnidadeCurricular";

export class Modulo {
    id: number;
    descricao: string;
    cargaHoraria: number;
    ofertaId: number;    
    oferta: Oferta;
    unidadesCurriculares: UnidadeCurricular[];
}