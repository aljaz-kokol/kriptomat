import {Component, Input, OnInit} from '@angular/core';
import {Coin} from '../../../models/coin.model';

@Component({
  selector: 'app-coin-card[coin]',
  templateUrl: './coin-card.component.html',
  styleUrls: [ './coin-card.component.css' ]
})
export class CoinCardComponent {
  @Input()  coin: Coin | null = null;
}
