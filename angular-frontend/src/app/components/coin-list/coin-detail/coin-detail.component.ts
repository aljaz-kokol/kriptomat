import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {Coin} from "../../../models/coin.model";
import {Subscription} from "rxjs";
import {Title} from "@angular/platform-browser";
import {PopupService} from "../../../services/popup.service";
import {CoinDetailService} from "../../../services/coin-detail.service";

@Component({
  selector: 'app-coin-detail',
  templateUrl: 'coin-detail.component.html',
  styleUrls: ['coin-detail.component.css'],
  providers: [
    CoinDetailService
  ]
})
export class CoinDetailComponent implements OnInit, OnDestroy {
  private _coinSubscription: Subscription | null = null;
  tabCoins: Coin[] = [];
  error: Error | null = null;
  coin: Coin | null = null;

  constructor(private _route: ActivatedRoute,
              private _title: Title,
              private _router: Router,
              private _popupService: PopupService,
              private _coinDetailService: CoinDetailService) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      const coinId: string = params.get('id') ?? '';
      this._coinDetailService.setCoin(coinId);
      this._coinSubscription = this._coinDetailService.coinChangeListener
        .subscribe(coin => {
          this.coin = coin;
        })
    });

  }

  ngOnDestroy() {
    if (this._coinSubscription)
      this._coinSubscription.unsubscribe();
  }

  get showSpinner(): boolean {
    return this._coinDetailService.fetchingData;
  }

  get showContent(): boolean {
    return !this.error && this.coin !== null;
  }

  onCoinsAdded(coins: Coin[]): void {
    this.tabCoins.push(...coins);
    this._popupService.toggleShow();
  }
}
