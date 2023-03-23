import { SenacCoin } from "./SenacCoin";

export class Usuario {
  id: string;
  userName: string;
  normalizedUserName: string;
  normalizedEmail: string;
  emailConfirmed: boolean;
  passwordHash: string;
  securityStamp: string;
  concurrencyStamp: string;
  phoneNumber: string;
  phoneNumberConfirmed: boolean;
  twoFactorEnabled: boolean;
  lockoutEnd: Date;
  lockoutEnabled: boolean;
  accessFailedCount: number;
  cpf: string;
  foto: string;
  nomeCompleto: string;
  apelido: string;
  email: string;
  dataNascimento: Date;
  telefone: string;
  dataCadastro: Date;
  status: number;
  senacCoin: SenacCoin;
}