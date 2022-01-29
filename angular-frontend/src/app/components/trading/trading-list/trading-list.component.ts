import {Component, OnInit} from "@angular/core";
import {CoinService} from "../../../services/coin.service";

@Component({
  selector: 'app-trading-list',
  templateUrl: 'trading-list.component.html',
  styleUrls: ['trading-list.component.css']
})
export class TradingListComponent implements OnInit {
  names: string[] = [];
  constructor(private _coinServer: CoinService) {}

  ngOnInit(): void {
    this._coinServer.getCoins().subscribe(data => {
      this.names = data.names
    })
  }

}
