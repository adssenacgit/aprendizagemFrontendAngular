import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-detalhe-badge',
  templateUrl: './detalhe-badge.component.html',
  styleUrls: ['./detalhe-badge.component.css']
})
export class DetalheBadgeComponent implements OnInit, OnDestroy {

  private _subscription: Subscription;
  id: string;

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
