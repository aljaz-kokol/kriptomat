import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Coin} from "../../../models/coin.model";
import {CoinService} from "../../../services/coin.service";
import {Price} from "../../../models/price.model";

@Component({
  selector: 'app-coin-detail',
  templateUrl: 'coin-detail.component.html',
  styleUrls: ['coin-detail.component.css']
})
export class CoinDetailComponent implements OnInit {
  error: Error | null = null;
  coin: Coin | null = null;
  prices: Price[] = [];

  constructor(private _route: ActivatedRoute,
              private _coinService: CoinService) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      const coinId: string = params.get('id') ?? '';
      this._coinService.getCoinById(coinId).subscribe(
        data => {
          this.coin = data.coin;
          this.prices = data.prices;
        },
      err => this.error = err
      );
    });
  }

  get showSpinner(): boolean {
    return !this.error && !this.coin;
  }

}
