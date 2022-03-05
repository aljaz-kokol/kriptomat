import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {CoinService} from "../../../../services/coin.service";
import {Coin} from "../../../../models/coin.model";
import {Subscription} from "rxjs";
import {CoinDetailService} from "../../../../services/coin-detail.service";
import {PopupService} from "../../../../services/popup.service";

@Component({
  selector: 'app-coin-add-popup',
  templateUrl: 'coin-add-popup.component.html',
  styleUrls: ['coin-add-popup.component.css']
})
export class CoinAddPopupComponent implements OnInit {
  @Input() alreadySelectedCoins: string[] = [];
  @Output() onCoinsAdded = new EventEmitter<Coin[]>()

  private _coinSubscription!: Subscription;
  private _coins: Coin[] = [];
  private _selectedCoins: Coin[] = []

  constructor(private _coinService: CoinService,
              private _popupService: PopupService) {}

  ngOnInit() {
    this._coins = this._coinService.coins;
    this._coinSubscription = this._coinService.coinChangeListener
      .subscribe(coins => {
        this._coins = coins.filter(coin => this.alreadySelectedCoins.indexOf(coin.id) < 0);
      })
  }

  get coins(): Coin[] {
    return this._coins.filter(coin => this.alreadySelectedCoins.indexOf(coin.id) < 0);
  }

  get canAdd(): boolean {
    return this._selectedCoins.length > 0;
  }

  isSelected(coin: Coin): boolean {
    const index = this._selectedCoins.findIndex(c => c.name === coin.name);
    return index >= 0;
  }

  selectedIndex(coin: Coin): number {
    const index = this._selectedCoins.findIndex(c => c.name === coin.name);
    return index;
  }

  onCoinSelected(coin: Coin) {
    const index = this._selectedCoins.findIndex(c => c.name === coin.name);
    if (index >= 0)
      this._selectedCoins.splice(index, 1);
    else
      this._selectedCoins.push(coin);
  }

  onSearch(filer: string) {
    this._coinService.filterByName(filer.toLowerCase().trim());
  }

  onAdd(): void {
    this._popupService.close();
    this.onCoinsAdded.emit(this._selectedCoins);
    this._selectedCoins = [];
    this._popupService.close();
  }
}
