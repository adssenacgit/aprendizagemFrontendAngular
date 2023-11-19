import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-detalhe-badge',
  templateUrl: './detalhe-badge.component.html',
  styleUrls: ['./detalhe-badge.component.css']
})
export class DetalheBadgeComponent implements OnInit {

  private _subscription: Subscription = new Subscription();
  id: string = "";

  constructor(
    private _activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this._subscription = this._activatedRoute.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

}
