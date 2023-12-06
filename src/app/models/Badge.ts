import {BadgeNivel} from "./BadgeNivel";
import {BadgeTipo} from "./BadgeTipo";

export class Badge {
  id: number;
  descricao: string;
  imagem: string;
  status: number;
  nomeArquivo: string;
  badgeNivelId: number;
  badgeNivel: BadgeNivel;
  badgeTipoId: number;
  badgeTipo: BadgeTipo;
}
