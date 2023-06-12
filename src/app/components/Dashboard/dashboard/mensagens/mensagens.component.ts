import { Component, Input, OnInit } from '@angular/core';
import { Mensagem } from 'src/app/models/Mensagem';
import { Usuario } from 'src/app/models/Usuario';
import { AuthGuardService } from 'src/app/services/auth-guard.service';
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

  mensagens = [1,2,3,4, 6, 7,8,9,10];

  activeIndex = 0;
  chat = false;
  usuario : Usuario = new Usuario;
  idUsuarioLogado : string;

  constructor(
    private usuarioService : UsuariosService,
    private authGuardService: AuthGuardService
    ) { }

  ngOnInit(): void {
    this.idUsuarioLogado = this.authGuardService.getIdUsuarioLogado();

    this.usuarioService.ObterUsuarioPorId(this.idUsuarioLogado).subscribe(resultado=>{
      this.usuario = resultado;
    })
  }

  toggleChat(){
    this.chat = !this.chat

  }

}
