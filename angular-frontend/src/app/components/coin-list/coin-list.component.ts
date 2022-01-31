import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {CoinService} from "../../services/coin.service";
import {Router} from "@angular/router";
import {Coin} from "../../models/coin.model";

@Component({
  selector: 'app-coin-list',
  templateUrl: 'coin-list.component.html',
  styleUrls: [ 'coin-list.component.css' ]
})
export class CoinListComponent implements OnInit {
  private _coins: Coin[] = [];
  private _searchString = '';

  constructor(private _coinService: CoinService, private _router: Router) {}

  ngOnInit(): void {
    this._coinService.getCoinList().subscribe((coins:  Coin[]) => {
      this._coins = coins;
    });
  }

  get coins(): Coin[] {
    return [...this._coins].filter(coin => coin.name.trim().toLocaleLowerCase().indexOf(this._searchString) >= 0);
  }

  filterList(search: string): void {
    this._searchString = search;
  }
}
