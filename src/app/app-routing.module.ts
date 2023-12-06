import { TopicoForumUcComponent } from './components/Dashboard/usuario-dashboard/usuario-unidade-curricular/forum-uc/topico-forum-uc/topico-forum-uc.component';
import { NovaPerguntaForumUcComponent } from './components/Dashboard/usuario-dashboard/usuario-unidade-curricular/forum-uc/nova-pergunta-forum-uc/nova-pergunta-forum-uc.component';
import { MensagensComponent } from './components/Dashboard/dashboard/mensagens/mensagens.component';
import { UsuarioRecursosComponent } from './components/Dashboard/usuario-dashboard/usuario-recursos/usuario-recursos.component';
import { ChapterListagemGeralComponent } from './components/Chapters/chapter-listagem-geral/chapter-listagem-geral.component';
import { TimelineListaComponent } from './components/UnidadeCurricular/timeline/timeline-lista/timeline-lista.component';
import { UsuarioTrilhaCursoComponent } from './components/Dashboard/usuario-dashboard/usuario-trilha-curso/usuario-trilha-curso.component';
import { UnidadeCurricularDescricaoComponent } from './components/UnidadeCurricular/descricao/unidade-curricular-descricao.component';
import { UsuarioSenacCoinComponent } from './components/Dashboard/usuario-dashboard/usuario-senac-coin/usuario-senac-coin.component';
import { UsuarioConceitosFeedbacksComponent } from './components/Dashboard/usuario-dashboard/usuario-conceitos-feedbacks/usuario-conceitos-feedbacks.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtualizarCursoComponent } from './components/Curso/atualizar-curso/atualizar-curso.component';
import { ListagemCursosComponent } from './components/Curso/listagem-cursos/listagem-cursos.component';
import { NovoCursoComponent } from './components/Curso/novo-curso/novo-curso.component';
import { DashboardComponent } from './components/Dashboard/dashboard/dashboard.component';
import { AtualizarFuncaoComponent } from './components/Funcao/atualizar-funcao/atualizar-funcao.component';
import { ListagemFuncoesComponent } from './components/Funcao/listagem-funcoes/listagem-funcoes.component';
import { NovaFuncaoComponent } from './components/Funcao/nova-funcao/nova-funcao.component';
import { LoginUsuarioComponent } from './components/Usuario/Login/login-usuario/login-usuario.component';
import { RegistrarUsuarioComponent } from './components/Usuario/Registro/registrar-usuario/registrar-usuario.component';
import { NovaOfertaComponent } from './components/Oferta/nova-oferta/nova-oferta.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ListagemOfertasComponent } from './components/Oferta/listagem-ofertas/listagem-ofertas.component';
import { AtualizarOfertaComponent } from './components/Oferta/atualizar-oferta/atualizar-oferta.component';
import { UsuarioDashboardComponent } from './components/Dashboard/usuario-dashboard/usuario-dashboard.component';
import { AdministradorDashboardComponent } from './components/Dashboard/administrador-dashboard/administrador-dashboard.component';
import { ProfessorDashboardComponent } from './components/Dashboard/professor-dashboard/professor-dashboard.component';
import { TimelineDetalhesComponent } from './components/UnidadeCurricular/timeline/timeline-detalhes/timeline-detalhes.component';
import { EstudoPrevioComponent } from './components/UnidadeCurricular/estudo-previo/estudo-previo.component';
import { EncontrosComponent } from './components/UnidadeCurricular/encontros/encontros.component';
import { ListaObjetosAprendizagem } from './components/UnidadeCurricular/lista-objetos-aprendizagem/lista-objetos-aprendizagem.component';
import { ComentarioComponent } from './components/ApoioDuvidas/comentario/comentario.component';
import { NovaPerguntaComponent } from './components/ApoioDuvidas/novapergunta/novapergunta.component';
import { AtividadesComponent } from './components/UnidadeCurricular/atividades/atividades.component';
import { ApoioDuvidasComponent } from './components/ApoioDuvidas/apoio-duvidas.component';
import { AjudaComponent } from './components/Dashboard/usuario-dashboard/usuario-ajuda/ajuda.component';
import { UsuarioRequerimentoWebComponent } from './components/Dashboard/usuario-dashboard/usuario-requerimento-web/usuario-requerimento-web.component';
import { UsuarioNoticiasComponent } from './components/Dashboard/usuario-dashboard/usuario-noticias/usuario-noticias.coomponent';
import { UsuarioUnidadeCurricularComponent } from './components/Dashboard/usuario-dashboard/usuario-unidade-curricular/usuario-unidade-curricular.component';
import { EncontrosListaComponent } from './components/Dashboard/usuario-dashboard/usuario-unidade-curricular/conteudo-uc/encontros/encontros.component';
import { ConteudoUcComponent } from './components/Dashboard/usuario-dashboard/usuario-unidade-curricular/conteudo-uc/conteudo-uc.component';
import { TarefasUcComponent } from './components/Dashboard/usuario-dashboard/usuario-unidade-curricular/tarefas-uc/tarefas-uc.component';
import { ConceitosUcComponent } from './components/Dashboard/usuario-dashboard/usuario-unidade-curricular/conceitos-uc/conceitos-uc.component';
import { ForumUcComponent } from './components/Dashboard/usuario-dashboard/usuario-unidade-curricular/forum-uc/forum-uc.component';
import { ParticipantesUcComponent } from './components/Dashboard/usuario-dashboard/usuario-unidade-curricular/participantes-uc/participantes-uc.component';
import { CarrinhoSenacCoinComponent } from './components/Dashboard/usuario-dashboard/carrinho-senac-coin/carrinho-senac-coin.component';
import { UsuarioPerfilComponent } from './components/Dashboard/usuario-dashboard/usuario-perfil/usuario-perfil.component';
import { ProfessorUnidadeCurricularComponent } from './components/Dashboard/professor-dashboard/professor-unidade-curricular/professor-unidade-curricular.component';
import { ProfessorConteudoUcComponent } from './components/Dashboard/professor-dashboard/professor-unidade-curricular/professor-conteudo-uc/professor-conteudo-uc.component';
import { ProfessorPlanejamentoUcComponent } from './components/Dashboard/professor-dashboard/professor-unidade-curricular/professor-planejamento-uc/professor-planejamento-uc.component';
import { SituacaoAprendizagemComponent } from './components/Dashboard/professor-dashboard/professor-unidade-curricular/professor-planejamento-uc/situacao-aprendizagem/situacao-aprendizagem.component';
import { AtividadeComponent } from './components/Dashboard/professor-dashboard/professor-unidade-curricular/professor-planejamento-uc/atividade/atividade.component';
import { ObjetoAprendizagemComponent } from './components/Dashboard/professor-dashboard/professor-unidade-curricular/professor-planejamento-uc/objeto-aprendizagem/objeto-aprendizagem.component';
import { ListagemTabelaBadgesComponent } from './components/Dashboard/usuario-dashboard/usuario-badges/professor/listagem-tabela-badge/listagem-tabela-badges.component';
import { SalvarBadgeComponent } from './components/Dashboard/usuario-dashboard/usuario-badges/professor/salvar-badge/salvar-badge.component';
import { DetalheBadgeComponent } from './components/Dashboard/usuario-dashboard/usuario-badges/estudante/detalhe-badge/detalhe-badge.component';
import { ListagemBadgesComponent } from './components/Dashboard/usuario-dashboard/usuario-badges/estudante/listagem-badges/listagem-badges.component';
import { AtualizarBadgeComponent } from './components/Dashboard/usuario-dashboard/usuario-badges/professor/atualizar-badge/atualizar-badge.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children:[
      {
        path: 'grupo/:id',
        component: UsuarioUnidadeCurricularComponent,
        children: [
          { path: "", redirectTo:"aulas", pathMatch: "full" },
          {
            path: 'aulas', component: ConteudoUcComponent
          },
          {
            path: 'tarefas', component: TarefasUcComponent
          },
          {
            path: 'conceitos', component: ConceitosUcComponent
          },
          {
            path: 'forum',
            component: ForumUcComponent
          },
          {
            path: 'forum/novapergunta',
            component: NovaPerguntaForumUcComponent
          },
          {
            path: 'forum/topico/:id',
            component: TopicoForumUcComponent
          },
          {
            path: 'participantes', component: ParticipantesUcComponent
          }
        ],
      },
      {
        path: 'professor/grupo/:id',
        component: ProfessorUnidadeCurricularComponent,
        children: [
          { path: "", redirectTo:"aulas", pathMatch: "full" },
          {
            path: 'aulas', component: ProfessorConteudoUcComponent
          },
          {
            path: 'planejamento', component: ProfessorPlanejamentoUcComponent
          },
          {
            path: 'situacao-aprendizagem/:id', component: SituacaoAprendizagemComponent
          },
          {
            path: 'objeto-aprendizagem', component: ObjetoAprendizagemComponent
          },
          {
            path: 'atividade', component: AtividadeComponent
          },
        ]
      },
      {
        path: 'recurso/usuariorecursos', component: UsuarioRecursosComponent
      },
      {
        path: 'chapter/listar', component: ChapterListagemGeralComponent
      },
      {
        path: 'timeline/detalhe/:id', component: TimelineDetalhesComponent
      },
      {
        path: 'unidadeCurricular/timelinelista', component: TimelineListaComponent
      },
      {
        path: 'unidadeCurricular/descricao/:id', component: UnidadeCurricularDescricaoComponent
      },
      {
        path: 'senacCoin/usuariosenaccoin', component: UsuarioSenacCoinComponent
      },
      {
        path: 'senacCoin/carrinhosenaccoin', component: CarrinhoSenacCoinComponent
      },
      {
        path: 'conceitos/usuarioconceitos', component: UsuarioConceitosFeedbacksComponent
      },
      {
        path: 'dashboard/usuariodashboard', component: UsuarioDashboardComponent
      },
      {
        path: 'dashboard/administradordashboard', component: AdministradorDashboardComponent
      },
      {
        path: 'dashboard/professordashboard', component: ProfessorDashboardComponent
      },
      {
        path: 'badges/listagembadges', component: ListagemBadgesComponent
      },
      {
        path: 'badges/professor/listagem', component: ListagemTabelaBadgesComponent
      },
      {
        path: 'badges/professor/salvar', component: SalvarBadgeComponent
      },
      {
        path: 'badges/professor/atualizar/:id', component: AtualizarBadgeComponent
      },
      {
        path: 'badges/estudante/listagem', component: ListagemBadgesComponent
      },
      {
        path: 'badges/estudante/detalhe/:id', component: DetalheBadgeComponent
      },
      {
        path: 'cursos/listagemcursos', component: ListagemCursosComponent
      },
      {
        path: 'cursos/novocurso', component: NovoCursoComponent
      },
      {
        path: 'cursos/atualizarcurso/:id', component: AtualizarCursoComponent
      },
      {
        path: 'curso/usuariotrilhacurso', component: UsuarioTrilhaCursoComponent
      },
      {
        path: 'funcoes/listagemfuncoes', component: ListagemFuncoesComponent
      },
      {
        path: 'funcoes/novafuncao', component: NovaFuncaoComponent
      },
      {
        path: 'funcoes/atualizarfuncao/:id', component: AtualizarFuncaoComponent
      },
      {
        path: 'ofertas/listagemofertas', component: ListagemOfertasComponent
      },
      {
        path: 'ofertas/novaoferta', component: NovaOfertaComponent
      },
      {
        path: 'ofertas/atualizaroferta/:id', component: AtualizarOfertaComponent
      },
      {
        path: 'unidadeCurricular/objetosaprendizagem', component: ListaObjetosAprendizagem
      },
      {
        path: 'comunidade/comentario/:id', component: ComentarioComponent
      },
      {
        path: 'comunidade/novapergunta', component: NovaPerguntaComponent
      },
      {
        path: 'mensagens/mensagens', component: MensagensComponent
      },
      {
        path: 'atividadeverificacao/:id', component: EstudoPrevioComponent
      },
      {
        path: 'atividades', component: AtividadesComponent
      },
      {
        path: 'comunidade', component: ApoioDuvidasComponent
      },
      {
        path: 'requerimentoweb', component: UsuarioRequerimentoWebComponent
      },
      {
        path: 'ajuda', component: AjudaComponent
      },
      {
        path: 'noticias', component: UsuarioNoticiasComponent
      },
      {
        path: 'perfil', component: UsuarioPerfilComponent
      }
    ]
  },
  {
    path: 'usuarios/registrarusuario', component: RegistrarUsuarioComponent
  },
  {
    path: 'usuarios/loginusuario', component: LoginUsuarioComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
