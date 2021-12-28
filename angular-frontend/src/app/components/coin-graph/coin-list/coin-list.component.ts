import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import {CoinService} from "../../../services/coin.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-coin-list',
  templateUrl: 'coin-list.component.html',
  styleUrls: [ 'coin-list.component.css' ]
})
export class CoinListComponent implements OnInit {
  @ViewChild('searchInput', {  static: false }) private searchInput?: ElementRef;
  coinsNames: string[] = [];

  constructor(private _coinService: CoinService, private _router: Router) {}

  ngOnInit(): void {
    this._coinService.getCoins().subscribe(data => {
      this.coinsNames = data.names;
    });
  }

  onSearch(): void {
    const inputStr = this.searchInput?.nativeElement.value.trim().toLowerCase();
    this._coinService.getCoins().subscribe(data => {
      this.coinsNames = data.names.filter(name => name.toLowerCase().indexOf(inputStr) >= 0);
    });
  }

  onCoinSelected(coinName: string): void {
      this._router.navigate(['coin-graph', coinName])
  }
}
