import { BadgeNivel } from "./BadgeNivel";

export class Badge {
    id: number;
    descricao: string;
    imagem: string;
    status: number;
    badgeNivelId: number;
    badgeNivel: BadgeNivel;
}