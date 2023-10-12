import { Component, Input, OnInit } from '@angular/core';
import { Badge } from 'src/app/models/Badge';

@Component({
  selector: 'app-badges-uc',
  templateUrl: './badges-uc.component.html',
  styleUrls: ['./badges-uc.component.css']
})
export class BadgesUcComponent implements OnInit {

  @Input()
  badges: Badge[]

  numOfBadges: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.badges.length > 3 ? this.numOfBadges = this.badges.length - 3 : this.numOfBadges = 0
  }

}
