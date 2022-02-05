import {Component, OnInit} from "@angular/core";
import {CoinService} from "../../services/coin.service";
import {Router} from "@angular/router";
import {Coin} from "../../models/coin.model";
import {PriceService} from "../../services/price.service";
import {Price} from "../../models/price.model";

@Component({
  selector: 'app-coin-list',
  templateUrl: 'coin-list.component.html',
  styleUrls: [ 'coin-list.component.css' ],
})
export class CoinListComponent implements OnInit {
  private _coins: Coin[] | null = null;
  private _searchString = '';

  constructor(private _coinService: CoinService,
              private _priceService: PriceService,
              private _router: Router) {}

  ngOnInit(): void {
    this._coinService.getCoinList().subscribe((coins:  Coin[]) => {
      this._coins = coins;
      // for (let i = 0; i < this._coins.length; i++) {
      //   this._priceService.fetchPricesSub(this._coins[i].id)
      //     .subscribe(prices => {
      //       if (this._coins) {
      //         this._coins[i].prices = prices;
      //       }
      //     })
      // }
    });
  }

  get coins(): Coin[] {
    if (this._coins)
      return [...this._coins].filter(coin => coin.name.trim().toLocaleLowerCase().indexOf(this._searchString) >= 0);
    return []
  }

  filterList(search: string): void {
    this._searchString = search;
  }

  get showSpinner(): boolean {
    return this._coins === null;
  }
}
