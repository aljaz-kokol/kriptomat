import {Component, OnDestroy, OnInit} from "@angular/core";
import {Coin} from "../../../../models/coin.model";
import {CoinDetailService} from "../../../../services/coin-detail.service";
import {PopupService} from "../../../../services/popup.service";
import {Subscription} from "rxjs";
import {DialogService} from "../../../../services/dialog.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {GroupService} from "../../../../services/group.service";

@Component({
  selector: 'app-coin-header',
  templateUrl: 'coin-header.component.html',
  styleUrls: ['coin-header.component.css']
})
export class CoinHeaderComponent implements OnInit, OnDestroy {
  private _coinSubscription!: Subscription;
  coin: Coin | null = null;

  constructor(private _coinDetailService: CoinDetailService,
              private _popupService: PopupService,
              public _dialogService: DialogService,
              private _snackBar: MatSnackBar,
              private _groupService: GroupService) {}

  ngOnInit() {
    this._coinSubscription = this._coinDetailService.coinChangeListener
      .subscribe(coin => {
        this.coin = coin;
      });
  }

  ngOnDestroy() {
    this._coinSubscription.unsubscribe();
  }

  onBuyCoin(): void {
    this._coinDetailService.buyCoin();
  }

  onSellCoin(): void {
    this._coinDetailService.sellCoin();
  }

  onShowPopup() {
    this._popupService.toggleShow();
  }

  onSaveGroup() {
    this._dialogService.openInputDialog({
      title: 'Create group',
      body: {
        text: 'Please input the name of the group you wish to create',
        placeholder: 'Group name...'
      }
    }).subscribe((result: boolean | string) => {
      if (result) {
        this._groupService.createGroup(result as string, this._coinDetailService.addedCoins)
          .subscribe({
            next: data => this._groupService.addGroup(data.group),
            error: err => this._snackBar.open(err.message, 'Close', { duration: 3000 })
          })
      }
    })
  }

  get bought(): boolean | null {
    return this._coinDetailService.bought;
  }

  get tabCoins(): Coin[] {
    if (this.coin)
      return this._coinDetailService.addedCoins.filter(coin => coin.name != this.coin?.name)
    return []
  }
}
