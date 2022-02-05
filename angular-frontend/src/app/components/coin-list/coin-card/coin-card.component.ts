import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Coin} from '../../../models/coin.model';
import {Router} from "@angular/router";

@Component({
  selector: 'app-coin-card[coin]',
  templateUrl: './coin-card.component.html',
  styleUrls: [ './coin-card.component.css' ]
})
export class CoinCardComponent {
  constructor(private _router: Router) {}
  @Input() showSelect: boolean = false;
  @Input() selected: boolean = false;
  @Input()  coin: Coin | null = null;

  @Output() onShowSelection = new EventEmitter<Coin>();

  onClick(): void {
    if (this.coin) {
      this._router.navigate(['coin', this.coin.id]);
    }
  }

  onLongClick(): void {
    if (this.coin) {
      this.onShowSelection.emit(this.coin);
    }
  }
}
