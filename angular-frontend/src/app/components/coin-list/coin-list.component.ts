import {Component, OnInit} from "@angular/core";
import {CoinService} from "../../services/coin.service";
import {Router} from "@angular/router";
import {Coin} from "../../models/coin.model";
import {PriceService} from "../../services/price.service";
import {PopupService} from "../../services/popup.service";

@Component({
  selector: 'app-coin-list',
  templateUrl: 'coin-list.component.html',
  styleUrls: [ 'coin-list.component.css' ],
})
export class CoinListComponent implements OnInit {
  private _coins: Coin[] | null = null;
  private _searchString = '';

  percentageOption = -1; // For sorting
  periodOption = 1; // For sorting

  constructor(private _coinService: CoinService,
              private _priceService: PriceService,
              private _router: Router,
              private _popupService: PopupService) {}

  ngOnInit(): void {
    this._coinService.getCoinList().subscribe((coins:  Coin[]) => {
      this._coins = coins;
    });
  }

  get coins(): Coin[] {
    if (this._coins)
      return this._sortedCoins.filter(coin => coin.name.trim().toLocaleLowerCase().indexOf(this._searchString) >= 0);
    return [];
  }

  get sortDisabled(): boolean {
    return !this._priceService.sortReady;
  }

  get showSpinner(): boolean {
    return this._coins === null;
  }

  filterList(search: string): void {
    this._searchString = search;
  }

  toggleSortPopup(): void {
    this._popupService.toggleShow();
  }

  private get _sortedCoins(): Coin[] {
    if (this._coins) {
      if (this.percentageOption !== -1) {
        // for (const coin of this._coins) {
        //   const max = Math.max(...this._priceService.getPercentageListForCoin(coin.id, this.percentageOption, 0).values);
        //   console.log(max);
        // }

        return this._coins.sort((c1: Coin, c2: Coin) => {
          const max1 = this._priceService.getPercentageMaxForCoin(c1.id, this.percentageOption, this.periodOption);
          const max2 = this._priceService.getPercentageMaxForCoin(c2.id, this.percentageOption, this.periodOption);
          return max1 - max2;
        });
      }
      return [...this._coins]
    }
    return [];
  }
}
