import { Component, OnInit } from '@angular/core';
import { Atividade } from 'src/app/models/Atividade';
import { AtividadeService } from 'src/app/services/atividade.service';
import { AuthGuardService } from 'src/app/services/auth-guard.service';

@Component({
  selector: 'app-usuario-proximas-atividades',
  templateUrl: './usuario-proximas-atividades.component.html',
  styleUrls: ['./usuario-proximas-atividades.component.css']
})
export class UsuarioProximasAtividadesComponent implements OnInit {

  atividades : Atividade[]=[];
  selectedAtividade : Atividade;
  idUsuarioLogado : string;
  data : string[];

  constructor(
    private atividadeService : AtividadeService,
    private authGuardService: AuthGuardService
    ) { }

  ngOnInit(): void {
    this.idUsuarioLogado = this.authGuardService.getIdUsuarioLogado();

    this.ObterAtividades();
  }

  ObterAtividades = () => {
    this.atividadeService.ObterAtividadesRecentesPeloUsuarioId(this.idUsuarioLogado).subscribe((resultado) => {
      this.atividades = resultado;
    })
  }

}