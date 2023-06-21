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
  list = [
    {
      nome: "Johnny",
      msg : "Sprint nova começando hoje.",
      img : "https://www.rj.senac.br/backendfront/assets/img/palestrantes/johnny-taful.jpg",
      unreaded : 1
    },
    {
      nome: "Roberto Harkovsky",
      msg : "",
      img : "https://media.licdn.com/dms/image/C4E03AQEBRNN-L1AygA/profile-displayphoto-shrink_800_800/0/1516214843079?e=2147483647&v=beta&t=0CRHcGm_BhkSt9JQNkO4W5YXujZzabJN4aI6k1nwweg",
      unreaded : 0
    },
    {
      nome: "Mackenzie",
      msg : "O academico caiu no final de semana, sim!",
      img : "https://media.licdn.com/dms/image/D4D03AQEkAzE6I9902g/profile-displayphoto-shrink_800_800/0/1674262668782?e=2147483647&v=beta&t=SQvbTv-OqrrxfxWpoxXQnB530WVqR3V7hzOVfO-Ifpw",
      unreaded : 0
    }
  ];

  fav = [
    {
      nome: "Johnny",
      msg : "",
      img : "https://www.rj.senac.br/backendfront/assets/img/palestrantes/johnny-taful.jpg",
      unreaded : 0
    },
    {
      nome: "Mackenzie",
      msg : "JavaBeans?",
      img : "https://media.licdn.com/dms/image/D4D03AQEkAzE6I9902g/profile-displayphoto-shrink_800_800/0/1674262668782?e=2147483647&v=beta&t=SQvbTv-OqrrxfxWpoxXQnB530WVqR3V7hzOVfO-Ifpw",
      unreaded : 1
    }
  ];

  group = [
    {
      nome: "Projeto Integrador",
      msg : "Hoje é apresentação do prjeto??",
      img : "https://blog.acelerato.com/wp-content/uploads/2019/06/gestao_projetos.jpg",
      unreaded : 0
    },
    {
      nome: "Banco de dados II",
      msg : "Como faz um join no sql?",
      img : "",
      unreaded : 1
    }
  ]


  activeIndex = 0;
  chat = false;
  estudante: Estudante;
  contatos: Usuario[] = [];
  contatoSelecionado: Usuario;
  mensagens: Mensagem[];
  idUsuarioLogado : string;
  usuario: Usuario;

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
    this.contatos.sort((a,b) => (a.nomeCompleto > b.nomeCompleto) ? 1 : ((b.nomeCompleto > a.nomeCompleto) ? -1 : 0))
      
    this.usuarioService.ObterUsuarioPorId(this.idUsuarioLogado).subscribe(resultado => {
      this.usuario = resultado;
    })

    })
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
      this.mensagens.sort((a,b) => (a.data > b.data) ? 1 : ((b.data > a.data) ? -1 : 0))
    }
    console.log("oi",this.mensagens)

  }

  EnviarMensagem(mensagemTexto: string){
    let mensagemEnviada: Mensagem = new Mensagem;
    mensagemEnviada.data = Date.now().toString();
    mensagemEnviada.mensagemTexto = mensagemTexto;
    mensagemEnviada.status = 0
    mensagemEnviada.usuarioAutor = this.usuario;
    mensagemEnviada.usuarioIdAutor = this.usuario.id;
    mensagemEnviada.usuario = this.contatoSelecionado;
    mensagemEnviada.usuarioId = this.contatoSelecionado.id;

  }

}
