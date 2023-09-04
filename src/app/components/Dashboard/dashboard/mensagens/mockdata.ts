import { Mensagem } from "src/app/models/Mensagem";
import { Usuario } from "src/app/models/Usuario";



// Criando instâncias de Usuário
const usuario1 = new Usuario();
usuario1.id = "1";
usuario1.userName = "usuariomock1";
usuario1.normalizedUserName = "USUARIOMOCK1";
usuario1.normalizedEmail = "usuario1@exemplo.com";
usuario1.emailConfirmed = true;
usuario1.passwordHash = "hash1";
usuario1.securityStamp = "stamp1";
usuario1.concurrencyStamp = "concurrency1";
usuario1.phoneNumber = "1234567890";
usuario1.phoneNumberConfirmed = false;
usuario1.twoFactorEnabled = false;
usuario1.lockoutEnd = new Date("2023-06-25T12:00:00Z");
usuario1.lockoutEnabled = true;
usuario1.accessFailedCount = 0;
usuario1.cpf = "12345678901";
usuario1.foto = "";
usuario1.nomeCompleto = "João da Silva";
usuario1.apelido = "João";
usuario1.email = "usuario1@exemplo.com";
usuario1.dataNascimento = new Date("1990-01-01");
usuario1.telefone = "9876543210";
usuario1.dataCadastro = new Date("2022-01-01");
usuario1.status = 1;

const usuario2 = new Usuario();
usuario2.id = "3b700ecc-cec9-4be4-8c00-48bced543861";
usuario2.userName = "usuariomock2";
usuario2.normalizedUserName = "USUARIOMOCK2";
usuario2.normalizedEmail = "usuario2@exemplo.com";
usuario2.emailConfirmed = true;
usuario2.passwordHash = "hash2";
usuario2.securityStamp = "stamp2";
usuario2.concurrencyStamp = "concurrency2";
usuario2.phoneNumber = "0987654321";
usuario2.phoneNumberConfirmed = false;
usuario2.twoFactorEnabled = false;
usuario2.lockoutEnd = new Date("2023-06-25T12:00:00Z");
usuario2.lockoutEnabled = true;
usuario2.accessFailedCount = 0;
usuario2.cpf = "98765432109";
usuario2.foto = "";
usuario2.nomeCompleto = "Maria Souza";
usuario2.apelido = "Maria";
usuario2.email = "usuario2@exemplo.com";
usuario2.dataNascimento = new Date("1995-05-05");
usuario2.telefone = "1234509876";
usuario2.dataCadastro = new Date("2022-01-01");
usuario2.status = 1;

// Criando instâncias de Mensagem
const mensagem1 = new Mensagem();
mensagem1.id = 1;
mensagem1.mensagemTexto = "Olá! Tudo bem?";
mensagem1.data = "2023-06-26T10:00:00Z";
mensagem1.status = 1;
mensagem1.usuarioId = usuario1.id;
mensagem1.usuario = usuario1;
mensagem1.usuarioIdAutor = usuario1.id;
mensagem1.usuarioAutor = usuario1;

const mensagem2 = new Mensagem();
mensagem2.id = 2;
mensagem2.mensagemTexto = "Sim, estou bem. E você?";
mensagem2.data = "2023-06-26T10:01:00Z";
mensagem2.status = 1;
mensagem2.usuarioId = usuario2.id;
mensagem2.usuario = usuario2;
mensagem2.usuarioIdAutor = usuario2.id;
mensagem2.usuarioAutor = usuario2;

// Adicionando as mensagens à conversa
export const conversa = [mensagem1, mensagem2];