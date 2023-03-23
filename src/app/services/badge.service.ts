import { BadgeRetorno } from './../models/DadosRetornoBadge';
import { DadosBadge } from './../models/DadoBadge';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Badge } from '../models/Badge';

const httpOptions = {
  headers: new HttpHeaders ({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('TokeUsuarioLogado')}`,
    }),
  };

@Injectable({
  providedIn: 'root'
})
export class BadgeService {

  url = environment.apiServer + 'api/Badge';
  constructor(private https: HttpClient) { }

  ObterTodos() : Observable<Badge[]>
  {
    return this.https.get<Badge[]>(this.url);
  }

  ObterBadgesPeloGrupoId (grupoId: number) : Observable<Badge[]>
  {
    const apiUrl = `${this.url}/FiltrarBadgeByGrupoId/${grupoId}`;
    return this.https.get<Badge[]>(apiUrl);
  }

  ObterBadgesPeloId(badgeId: number): Observable<BadgeRetorno>
  {
    const apiUrl = `${this.url}/${badgeId}`;
    return this.https.get<BadgeRetorno>(apiUrl);
  }

  NovoBadge(badge: DadosBadge): Observable<any>{
    return this.https.post<any>(this.url, badge, httpOptions);
  }

  AtualizarBadge(badgeId: number, badge: Badge): Observable<any>{
    const apiUrl = `${this.url}/${badgeId}`;
    return this.https.put<Badge>(apiUrl, badge, httpOptions);
  }

  ExcluirBadge(badgeId: number): Observable<any>{
    const apiUrl = `${this.url}/${badgeId}`;
    return this.https.delete<Badge>(apiUrl, httpOptions);    
  }

  FiltrarBadges(descricaoBadge: string) : Observable<Badge[]>
  {
    const apiUrl = `${this.url}/FiltrarBadge/${descricaoBadge}`;
    return this.https.get<Badge[]>(apiUrl);
  }

  SalvarImagem(formData: any): Observable<any>
  {
    const apiUrl = `${this.url}/SalvarImagem`;
    return this.https.post<any>(apiUrl, formData);
  }

}
