import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-link',
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.css']
})
export class LinkComponent implements OnInit {

  @Input() link: string;
  @Input() titulo: String;
  @Input() icone: string;
  currentRoute: string;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentRoute = this.router.url
  }

}
