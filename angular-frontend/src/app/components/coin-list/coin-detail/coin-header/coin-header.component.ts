import {Component, OnDestroy, OnInit} from "@angular/core";
import {Coin} from "../../../../models/coin.model";
import {CoinDetailService} from "../../../../services/coin-detail.service";
import {PopupService} from "../../../../services/popup.service";
import {Subscription} from "rxjs";
import {DialogService} from "../../../../services/dialog.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {GroupService} from "../../../../services/group.service";
import {ActivatedRoute, Router} from "@angular/router";

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
              private _groupService: GroupService,
              private _route: ActivatedRoute,
              private _router: Router) {}

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
      body: 'Please type in the name of the group you wish to create. Optionally you can also create a note for the group',
      actions: [
        {action: 'name', type: 'text', required: true, placeholder: 'Group name...'},
        {action: 'note', type: 'text', required: false, placeholder: 'Some note...'}
      ]
    }).subscribe((result: false | {[s: string]: any}) => {
      if (result) {
        this._groupService.createGroup(result['name'], this._coinDetailService.addedCoins, result['note'])
          .subscribe({
            next: data => {
              this._groupService.addGroup(data.group);
              this._router.navigate(['coin', data.group.id, this.coin?.id])
            },
            error: err => this._snackBar.open(err.message, 'Close', { duration: 3000 })
          })
      }
    })
  }

  onUpdateGroup() {
    this._dialogService.openChoiceDialog({
      title: 'Update',
      body: 'Are you sure you want to update and save changes made to group?'
    }).subscribe(result => {
      const group = this._coinDetailService.group;
      if (result && group) {
        const coinId = this._coinDetailService.addedCoins.map(coin => coin.id);
        this._groupService.updateGroup(group.id, group.name, group.note, coinId).subscribe({
          next: updatedGroup => this._coinDetailService.updateGroup(updatedGroup),
          error: err => this._snackBar.open(err.message, 'Close', { duration: 3000 })
        })
      }
    });
  }

  get bought(): boolean | null {
    return this._coinDetailService.bought;
  }

  get tabCoins(): Coin[] {
    if (this.coin)
      return this._coinDetailService.addedCoins.filter(coin => coin.name != this.coin?.name)
    return []
  }

  get canSave(): boolean {
    return this._coinDetailService.shouldSave;
  }

  get canUpdate(): boolean {
    return this._coinDetailService.shouldUpdate;
  }
}
