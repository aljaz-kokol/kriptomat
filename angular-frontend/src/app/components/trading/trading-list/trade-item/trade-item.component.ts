import {Component, Input} from "@angular/core";
import {CoinService} from "../../../../services/coin.service";

@Component({
  selector: 'app-trade-item',
  templateUrl: 'trade-item.component.html',
  styleUrls: [ 'trade-item.component.css' ]
})
export class TradeItemComponent {
  @Input() coinName: string | undefined;

  constructor(private _coinService: CoinService) {}

  onCoinBuy(): void {
    if (this.coinName)
      this._coinService.buyCoin(this.coinName).subscribe();
  }
}
