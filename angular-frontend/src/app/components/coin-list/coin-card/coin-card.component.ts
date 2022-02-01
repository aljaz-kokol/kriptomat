import {Component, Input, OnInit} from '@angular/core';
import {Coin} from '../../../models/coin.model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-coin-card[coin]',
  templateUrl: './coin-card.component.html',
  styleUrls: [ './coin-card.component.css' ]
})
export class CoinCardComponent {
  constructor(private _router: Router) {}

  @Input()  coin: Coin | null = null;

  onClick(): void {
    if (this.coin) {
      this._router.navigate(['coin-list', this.coin.id]);
    }
  }
}
