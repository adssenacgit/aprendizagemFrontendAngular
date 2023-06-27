import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-usuario-requerimento-web',
  templateUrl: './usuario-requerimento-web.component.html',
  styleUrls: ['./usuario-requerimento-web.component.css']
})
export class UsuarioRequerimentoWebComponent implements OnInit {

  url: string = "http://reqsenacrj.agilsist.com.br/loginestudante.aspx";
  urlSafe: SafeResourceUrl;

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.urlSafe= this.sanitizer.bypassSecurityTrustResourceUrl(this.url);
  }

}
