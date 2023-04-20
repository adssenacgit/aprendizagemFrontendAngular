import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CursosService } from '../app/services/cursos.service';
import { CursoTiposService } from '../app/services/curso-tipos.service';
import { FuncoesService } from '../app/services/funcoes.service';
import { OfertasService } from './services/ofertas.service';
import { AuthGuardService } from './services/auth-guard.service';

import { ListagemCursosComponent, DialogExclusaoCursosComponent } from './components/Curso/listagem-cursos/listagem-cursos.component';
import { NovoCursoComponent } from './components/Curso/novo-curso/novo-curso.component';
import { AtualizarCursoComponent } from './components/Curso/atualizar-curso/atualizar-curso.component';

import { ListagemFuncoesComponent, DialogExclusaoFuncoesComponente } from './components/Funcao/listagem-funcoes/listagem-funcoes.component';
import { NovaFuncaoComponent } from './components/Funcao/nova-funcao/nova-funcao.component';
import { AtualizarFuncaoComponent } from './components/Funcao/atualizar-funcao/atualizar-funcao.component';

import { NovaOfertaComponent } from './components/Oferta/nova-oferta/nova-oferta.component';
import { ListagemOfertasComponent, DialogExclusaoOfertasComponent } from './components/Oferta/listagem-ofertas/listagem-ofertas.component';
import { AtualizarOfertaComponent } from './components/Oferta/atualizar-oferta/atualizar-oferta.component';

import { RegistrarUsuarioComponent } from './components/Usuario/Registro/registrar-usuario/registrar-usuario.component';

import { UsuarioDashboardComponent } from './components/Dashboard/usuario-dashboard/usuario-dashboard.component';
import { UsuarioListaUcComponent } from './components/Dashboard/usuario-dashboard/usuario-lista-uc/usuario-lista-uc.component';

import { AdministradorListaCursosComponent } from './components/Dashboard/administrador-dashboard/administrador-lista-cursos/administrador-lista-cursos/administrador-lista-cursos.component';
import { AdministradorDashboardComponent } from './components/Dashboard/administrador-dashboard/administrador-dashboard.component';

import { UsuarioCalendarioAcademicoComponent } from './components/Dashboard/usuario-dashboard/usuario-calendario-academico/usuario-calendario-academico/usuario-calendario-academico.component';
import { UsuarioConceitosFeedbacksComponent } from './components/Dashboard/usuario-dashboard/usuario-conceitos-feedbacks/usuario-conceitos-feedbacks.component';
import { UsuarioSenacCoinComponent } from './components/Dashboard/usuario-dashboard/usuario-senac-coin/usuario-senac-coin.component';
import { UsuarioTrilhaCursoComponent } from './components/Dashboard/usuario-dashboard/usuario-trilha-curso/usuario-trilha-curso.component';
import { UsuarioRecursosComponent } from './components/Dashboard/usuario-dashboard/usuario-recursos/usuario-recursos.component';

import { UnidadeCurricularDescricaoComponent } from './components/UnidadeCurricular/descricao/unidade-curricular-descricao.component';

import { EstudoPrevioComponent } from './components/UnidadeCurricular/estudo-previo/estudo-previo.component';
import { EncontrosComponent } from './components/UnidadeCurricular/encontros/encontros.component';

import { ListagemBadgesComponent, DialogExclusaoBadgeComponent } from './components/Badge/listagem-badge/listagem-badges.component';
import { NovoBadgeComponent } from './components/Badge/novo-badge/novo-badge.component';
import { AtualizarBadgeComponent } from './components/Badge/atualizar-badge/atualizar-badge.component';

import { MenuUsuarioComponent } from './components/Dashboard/header/menu-usuario/menu-usuario.component';

import { TimelineListaComponent } from './components/UnidadeCurricular/timeline/timeline-lista/timeline-lista.component';
import { TimelineDetalhesComponent } from './components/UnidadeCurricular/timeline/timeline-detalhes/timeline-detalhes.component';

import { ChapterListagemGeralComponent } from './components/Chapters/chapter-listagem-geral/chapter-listagem-geral.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxMaskModule } from 'ngx-mask';
import { LoginUsuarioComponent } from './components/Usuario/Login/login-usuario/login-usuario.component';
import { JwtModule } from '@auth0/angular-jwt';
import { DashboardComponent } from './components/Dashboard/dashboard/dashboard.component';
import { HeaderComponent } from './components/Dashboard/header/header.component';


import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule} from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

//PrimeNG Imports
import { TabViewModule } from 'primeng/tabview';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { AccordionModule } from 'primeng/accordion';
import { MenuModule } from 'primeng/menu';
import { TimelineModule } from 'primeng/timeline';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { FieldsetModule } from 'primeng/fieldset';
import { CheckboxModule } from 'primeng/checkbox';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { DividerModule } from 'primeng/divider';
import { OrderListModule } from 'primeng/orderlist';
import { FileUploadModule } from 'primeng/fileupload';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { CarouselModule } from 'primeng/carousel';
import { KnobModule } from 'primeng/knob';

//Ngx Imports
import { DragScrollModule } from 'ngx-drag-scroll';

export function PegarTokenUsuario(){
  return localStorage.getItem("TokenUsuarioLogado");
}


import { registerLocaleData } from '@angular/common';
import localePT from '@angular/common/locales/pt';
import localeES from '@angular/common/locales/es';
import localeDE from '@angular/common/locales/de';
import localeFR from '@angular/common/locales/fr';
import { ApoioDuvidasComponent } from './components/apoio-duvidas/apoio-duvidas.component';
import { NovaperguntaComponent } from './components/apoio-duvidas/novapergunta/novapergunta.component';


registerLocaleData(localePT);
registerLocaleData(localeES);
registerLocaleData(localeDE);
registerLocaleData(localeFR);

@NgModule({
  declarations: [
    AppComponent,
    ListagemCursosComponent,
    NovoCursoComponent,
    AtualizarCursoComponent,
    DialogExclusaoCursosComponent,
    ListagemBadgesComponent,    
    DialogExclusaoBadgeComponent,
    NovoBadgeComponent,
    AtualizarBadgeComponent,
    ListagemFuncoesComponent,
    NovaFuncaoComponent,
    AtualizarFuncaoComponent,
    DialogExclusaoFuncoesComponente,
    RegistrarUsuarioComponent,
    LoginUsuarioComponent,
    DashboardComponent,
    HeaderComponent,
    NovaOfertaComponent,
    ListagemOfertasComponent,
    AtualizarOfertaComponent,
    DialogExclusaoOfertasComponent,
    UsuarioDashboardComponent,
    AdministradorDashboardComponent,
    AdministradorListaCursosComponent,
    UsuarioListaUcComponent,
    UsuarioCalendarioAcademicoComponent,
    UsuarioConceitosFeedbacksComponent,
    UsuarioSenacCoinComponent,
    UsuarioRecursosComponent,
    UnidadeCurricularDescricaoComponent,
    UsuarioTrilhaCursoComponent,
    MenuUsuarioComponent,
    TimelineListaComponent,
    TimelineDetalhesComponent,
    ChapterListagemGeralComponent,
    EstudoPrevioComponent,
    EncontrosComponent,
    ApoioDuvidasComponent,
    NovaperguntaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDividerModule,
    MatSelectModule,
    MatGridListModule,
    MatDialogModule,
    FormsModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    FlexLayoutModule,
    NgxMaskModule.forRoot(),
    JwtModule.forRoot({
      config:{
        tokenGetter: PegarTokenUsuario,
        allowedDomains: ['localhost:5099'],
        disallowedRoutes: []
      }      
    }),
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    TabViewModule,
    ButtonModule,
    ProgressBarModule,
    TableModule,
    ToastModule,
    AccordionModule,
    MenuModule,
    TimelineModule,
    CardModule,
    DialogModule,
    FieldsetModule,
    CheckboxModule,
    ToggleButtonModule,
    DividerModule,
    OrderListModule,
    FileUploadModule,
    ScrollPanelModule,
    CarouselModule,
    DragScrollModule,
    KnobModule
  ],
  providers: [
    CursosService,
    CursoTiposService,
    FuncoesService,
    OfertasService,
    AuthGuardService,    
    HttpClientModule, 
    {provide:LocationStrategy, useClass:HashLocationStrategy},
    {provide: MAT_DATE_LOCALE, useValue: 'pt-BR'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
