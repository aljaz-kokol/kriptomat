import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {Coin} from "../../../models/coin.model";
import {CoinService} from "../../../services/coin.service";
import {PriceService} from "../../../services/price.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-coin-detail',
  templateUrl: 'coin-detail.component.html',
  styleUrls: ['coin-detail.component.css'],
})
export class CoinDetailComponent implements OnInit, OnDestroy {
  private _priceListenerSubscription: Subscription | null = null;
  error: Error | null = null;
  coin: Coin | null = null;

  constructor(private _route: ActivatedRoute,
              private _coinService: CoinService,
              private _priceService: PriceService) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      const coinId: string = params.get('id') ?? '';
      this._coinService.getCoinById(coinId).subscribe({
        next: coin => {
          this.coin = coin;
          this._priceService.fetchPrices(this.coin.id);
        },
        error: err => this.error = err
      });
    });

  }

  ngOnDestroy() {
    this._priceListenerSubscription?.unsubscribe();
  }

  get showSpinner(): boolean {
    return !this.error && !this.coin;
  }

  get showContent(): boolean {
    return !this.error && this.coin !== null;
  }
}
