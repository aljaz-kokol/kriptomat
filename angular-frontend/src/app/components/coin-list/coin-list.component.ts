import {Component, OnDestroy, OnInit} from "@angular/core";
import {CoinService} from "../../services/coin.service";
import {Router} from "@angular/router";
import {Coin} from "../../models/coin.model";
import {PriceService} from "../../services/price.service";
import {PopupService} from "../../services/popup.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-coin-list',
  templateUrl: 'coin-list.component.html',
  styleUrls: [ 'coin-list.component.css' ],
})
export class CoinListComponent implements OnInit, OnDestroy {
  private _coinsSubscription!: Subscription;

  coins: Coin[] = [];
  percentPeriod = -1; // For sorting
  timePeriod = 1; // For sorting

  constructor(private _coinService: CoinService,
              private _priceService: PriceService,
              private _router: Router,
              private _popupService: PopupService) {}

  ngOnInit(): void {
    this.coins = this._coinService.coins;
    this._coinsSubscription = this._coinService.coinChangeListener
      .subscribe(coins => {
        this.coins = coins;
      })
  }

  ngOnDestroy() {
    this._coinsSubscription.unsubscribe();
  }

  get sortDisabled(): boolean {
    return !this._priceService.sortReady;
  }

  filterList(search: string): void {
    this._coinService.filterByName(search);
  }

  toggleSortPopup(): void {
    this._popupService.toggleShow();
  }

  onPercentChange(percentPeriod: number) {
    this.percentPeriod = percentPeriod;
    this._coinService.sortByPercent(percentPeriod, this.timePeriod);
  }

  onPeriodChange(timePeriod: number) {
    this.timePeriod = timePeriod;
    this._coinService.sortByPercent(this.percentPeriod, timePeriod);
  }
}
