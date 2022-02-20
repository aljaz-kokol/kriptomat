import {Component, OnDestroy, OnInit} from "@angular/core";
import {CoinService} from "../../services/coin.service";
import {Router} from "@angular/router";
import {Coin} from "../../models/coin.model";
import {PriceService} from "../../services/price.service";
import {PopupService} from "../../services/popup.service";
import {Subscription} from "rxjs";
import {Title} from "@angular/platform-browser";
import {DialogService} from "../../services/dialog.service";
import {MatSnackBar} from "@angular/material/snack-bar";

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
  showSortBtn = false;
  creatingGroup = false;

  constructor(private _coinService: CoinService,
              private _priceService: PriceService,
              private _router: Router,
              private _popupService: PopupService,
              private _dialogService: DialogService,
              private _title: Title,
              private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this._title.setTitle('Coin List');
    this.coins = this._coinService.coins;
    this.showSortBtn = this._priceService.sortReady;
    this._coinsSubscription = this._coinService.coinChangeListener
      .subscribe(coins => {
        this.coins = coins;
        this.showSortBtn = this._priceService.sortReady;
      })
  }

  ngOnDestroy() {
    this._coinsSubscription.unsubscribe();
  }

  onFetchSortData() {
    this.showSortBtn = true;
    this._priceService.fetchAllPrices();
  }

  onAddGroup() {
    this.creatingGroup = true;
    this._dialogService.openAddGroupDialog({
      disableClose: true
    }).subscribe(result => {
      this.creatingGroup = false;
      if (result) {
        this._snackBar.open(result, 'Close', {
          duration: 3000
        });
      }
    });
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
