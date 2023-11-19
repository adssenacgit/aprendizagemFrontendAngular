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
import { TimelineDetalhesComponent } from './components/UnidadeCurricular/timeline/timeline-detalhes/timeline-detalhes.component';
import { EstudoPrevioComponent } from './components/UnidadeCurricular/estudo-previo/estudo-previo.component';
import { EncontrosComponent } from './components/UnidadeCurricular/encontros/encontros.component';
import { ListagemTabelaBadgesComponent } from './components/Dashboard/usuario-dashboard/usuario-badges/professor/listagem-tabela-badges/listagem-tabela-badges.component';
import { NovoBadgeComponent } from './components/Dashboard/usuario-dashboard/usuario-badges/professor/novo-badge/novo-badge.component';
import { AtualizarBadgeComponent } from './components/Dashboard/usuario-dashboard/usuario-badges/professor/atualizar-badge/atualizar-badge.component';
import { ListagemBadgesComponent } from './components/Dashboard/usuario-dashboard/usuario-badges/estudante/listagem-badges/listagem-badges.component';
import { ListaObjetosAprendizagem } from './components/UnidadeCurricular/lista-objetos-aprendizagem/lista-objetos-aprendizagem.component';
import { ComentarioComponent } from './components/ApoioDuvidas/comentario/comentario.component';
import { NovaPerguntaComponent } from './components/ApoioDuvidas/novapergunta/novapergunta.component';
import { AtividadesComponent } from './components/UnidadeCurricular/atividades/atividades.component';
import { ApoioDuvidasComponent } from './components/ApoioDuvidas/apoio-duvidas.component';
import { AjudaComponent } from './components/Dashboard/usuario-dashboard/usuario-ajuda/ajuda.component';
import { UsuarioRequerimentoWebComponent } from './components/Dashboard/usuario-dashboard/usuario-requerimento-web/usuario-requerimento-web.component';
import { UsuarioNoticiasComponent } from './components/Dashboard/usuario-dashboard/usuario-noticias/usuario-noticias.coomponent';
import {
  DetalheBadgeComponent
} from "./components/Dashboard/usuario-dashboard/usuario-badges/estudante/detalhe-badge/detalhe-badge.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuardService],
    children:[
      {
        path: 'unidadeCurricular/encontros/:id', component: EncontrosComponent
      },
      {
        path: 'unidadeCurricular/estudoprevio', component: EstudoPrevioComponent
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
        path: 'conceitos/usuarioconceitos', component: UsuarioConceitosFeedbacksComponent
      },
      {
        path: 'dashboard/usuariodashboard', component: UsuarioDashboardComponent
      },
      {
        path: 'dashboard/administradordashboard', component: AdministradorDashboardComponent
      },
      {
        path: 'badges/listagembadges', component: ListagemBadgesComponent
      },
      {
        path: 'badges/novobadge', component: NovoBadgeComponent
      },
      {
        path: 'badges/atualizarbadge/:id', component: AtualizarBadgeComponent
      },
      {
        path: 'badges/detalhe/:id', component: DetalheBadgeComponent
      },
      {
        path: 'badges/listagemusuariobadges', component: ListagemBadgesComponent
      },
      {
        path: 'badges/listagemtabelabadges', component: ListagemTabelaBadgesComponent
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
