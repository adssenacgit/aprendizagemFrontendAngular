import { Component, ContentChildDecorator, Input, OnInit } from '@angular/core';
import { isEmpty } from 'rxjs';
import { Estudante } from 'src/app/models/Estudante';
import { Mensagem } from 'src/app/models/Mensagem';
import { Usuario } from 'src/app/models/Usuario';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
import { EstudantesService } from 'src/app/services/estudante.service';
import { MensagemService } from 'src/app/services/mensagem.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-mensagens',
  templateUrl: './mensagens.component.html',
  styleUrls: ['./mensagens.component.css']
})
export class MensagensComponent implements OnInit {

  activeIndex = 0;
  chat = false;
  estudante: Estudante;
  contatos: Usuario[] = [];
  contatoSelecionado: Usuario;
  mensagens: Mensagem[] = [];
  idUsuarioLogado : string;
  usuario: Usuario;
  mensagemTexto: string;

  constructor(
    private usuarioService: UsuariosService,
    private mensagemService : MensagemService,
    private estudanteService : EstudantesService,
    private authGuardService: AuthGuardService
    ) { }

  ngOnInit(): void {
    this.idUsuarioLogado = this.authGuardService.getIdUsuarioLogado();

    this.estudanteService.ObterEstudanteByUsuarioId(this.idUsuarioLogado).subscribe(resultado=>{
      this.estudante = resultado;
    })

    // this.estudanteService.ObterEstudanteByOfertaId(this.estudante.ofertaId).subscribe(resultado=>{
    this.estudanteService.ObterEstudanteByOfertaId(1).subscribe(resultado=>{
    
    resultado.forEach(estudante => {
      this.contatos.push(estudante.usuario)
    });

    // Ordena a lista
    this.contatos.sort((a, b) => a.nomeCompleto.localeCompare(b.nomeCompleto));

      
    this.usuarioService.ObterUsuarioPorId(this.idUsuarioLogado).subscribe(resultado => {
      this.usuario = resultado;
    })

    })
    console.log('contatos', this.contatos)
  }

 

  toggleChat(usuario?: Usuario){
    
    this.chat = !this.chat
    if(usuario){
      this.contatoSelecionado = usuario
  
      this.mensagemService.ObterMensagemPorUsuarioId(this.contatoSelecionado.id).subscribe(resultado => {
        this.mensagens = resultado
      })
      this.mensagemService.ObterMensagemPorUsuarioId(this.idUsuarioLogado).subscribe(resultado => {
        resultado.forEach(mensagem => {
          this.mensagens.push(mensagem)
        });
      })

      this.mensagens.sort((a, b) => {
        const paramA = a.data; // Acesse o parâmetro desejado em cada objeto JSON
        const paramB = b.data;
      
        if (paramA < paramB) {
          return -1; // Retorna um número negativo se a for menor que b
        }
        if (paramA > paramB) {
          return 1; // Retorna um número positivo se a for maior que b
        }
        return 0; // Retorna zero se os parâmetros forem iguais
      });

    }
    console.log("Mensagens",this.mensagens)

  }

  EnviarMensagem(){
    let mensagemEnviada: Mensagem = new Mensagem;
    mensagemEnviada.data = Date.now().toString();
    mensagemEnviada.mensagemTexto = this.mensagemTexto;
    mensagemEnviada.status = 0
    mensagemEnviada.usuarioAutor = this.usuario;
    mensagemEnviada.usuarioIdAutor = this.usuario.id;
    mensagemEnviada.usuario = this.contatoSelecionado;
    mensagemEnviada.usuarioId = this.contatoSelecionado.id;
    console.log('foi', mensagemEnviada)
    this.mensagemService.NovaMensagem(mensagemEnviada).subscribe(resultado => {

      this.mensagens.push(mensagemEnviada);
      this.mensagemTexto = '';
      
    })
  }

}
