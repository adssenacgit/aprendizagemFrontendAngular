import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Atividade } from '../models/Atividade';


const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('TokeUsuarioLogado')}`,
    }),
  };

@Injectable({
  providedIn: 'root'
})
export class AtividadeService {

  url = environment.apiServer + 'api/Atividade';
  urlAtividade = environment.apiServer + 'api/Atividade/AtividadeEnviarArquivoByAtividadeIdByEstudanteId';
  constructor(private https: HttpClient) { }

  //Atividades por situação de aprendizagem
  FiltrarAtividadebySituacaoAprendizagemId (id: number) : Observable<Atividade[]>
  {
    const apiUrl = `${this.url}/FiltrarAtividadebySituacaoAprendizagemId/${id}`;
    return this.https.get<Atividade[]>(apiUrl);
  }

  //Atividade por situação de aprendizagem
  ObterAtividadePorSituacaoId (situacaoId: number) : Observable<Atividade>
  {
    const apiUrl = `${this.url}/FiltrarAtividadeBySituacaoAprendizagemId/${situacaoId}`
    return  this.https.get<Atividade>(apiUrl);
  }

  ObterAtividadePorId (atividadeId: number) : Observable<Atividade>
  {
    const apiUrl = `${this.url}/${atividadeId}`
    return  this.https.get<Atividade>(apiUrl);
  }

  ObterAtividadesRecentesPeloUsuarioId(usuarioId : string){
    const apiUrl = `${this.url}`
    return this.https.get<Atividade[]>(apiUrl);
  }

  // CadastrarAtividade(atividade: Set<File>, atividadeId: number, usuarioId: number){
  //   const formData = new FormData();
  //   // atividade.forEach(arquivo => formData.append('file', arquivo, arquivo.name));

  //   const request = new HttpRequest('POST', `${this.urlAtividade}/${atividadeId}/${usuarioId}` , formData);
  //   return this.https.request(request);
  // }

  CadastrarAtividade(atividade: Blob, atividadeId: number, usuarioId: number){
    // const formData = new FormData();
    // atividade.forEach(arquivo => formData.append('file', arquivo, arquivo.name));

    // const request = new HttpRequest('POST', `${this.urlAtividade}/${atividadeId}/3b700ecc-cec9-4be4-8c00-48bced543861/${usuarioId}/` , { binaryData: Array.from(atividade) }, httpOptions);
    // return this.https.request(request);

    return this.https.post(`${this.urlAtividade}/${atividadeId}/${usuarioId}` , { atividade }, httpOptions);

  }

  async formatarAtividades(questoes : Atividade[]) {
    questoes.forEach((atividade) => {
      if(atividade.atividadeTipo == null){
        atividade.enunciado = atividade.descricao;
      }
      else{
        if(atividade.atividadeTipo.id == 2){
          let enunciados : String[] = atividade.descricao.split("::");
          atividade.enunciado = enunciados[0];
          for (let index = 1; index < enunciados.length; index++) {
            atividade.alternativas?.push(enunciados[index]);
          }
        }
      }
    });
    return await Promise.resolve(questoes)
  }
}
