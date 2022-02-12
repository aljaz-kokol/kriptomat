import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Coin} from '../../../models/coin.model';
import {Router} from "@angular/router";
import {CoinDetailService} from "../../../services/coin-detail.service";

@Component({
  selector: 'app-coin-card[coin]',
  templateUrl: './coin-card.component.html',
  styleUrls: [ './coin-card.component.css' ]
})
export class CoinCardComponent {
  constructor(private _router: Router) {}
  @Input()  coin: Coin | null = null;

  @Output() onShowSelection = new EventEmitter<Coin>();

  onClick(): void {
    if (this.coin) {
      this._router.navigate(['coin', this.coin.id]);
    }
  }
}
