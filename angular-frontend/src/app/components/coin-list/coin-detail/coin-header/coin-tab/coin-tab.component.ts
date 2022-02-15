import {Component, Input} from "@angular/core";
import {Coin} from "../../../../../models/coin.model";
import {CoinDetailService} from "../../../../../services/coin-detail.service";
import {ActivatedRoute, Router} from "@angular/router";
import {DialogService} from "../../../../../services/dialog.service";

@Component({
  selector: 'app-coin-tab',
  templateUrl: 'coin-tab.component.html',
  styleUrls: ['coin-tab.component.css']
})
export class CoinTabComponent {
  @Input() coin!: Coin;
  constructor(private _coinDetailService: CoinDetailService,
              private _router: Router,
              private _route: ActivatedRoute,
              private _dialogService: DialogService) {}

  onRemoveTabCoin(event: Event) {
    event.stopPropagation();
    this._dialogService.openChoiceDialog({
        title: 'Remove tab',
        body: `Are you sure you want to remove ${this.coin.name} from tabs?`
    }).subscribe(result => {
      if (result)
        this._coinDetailService.removeCoin(this.coin);
    })
  }

  onTabCoinClick() {
    this._router.navigate(['..',this.coin.id], {relativeTo: this._route})
  }

  get isGraphCoin() {
    return this._coinDetailService.addedGraphCoins.findIndex(coin => this.coin.name == coin.name) >= 0;
  }

  onShowTabCoinInGraph(event: Event) {
    event.stopPropagation();
    this._coinDetailService.toggleGraphCoin(this.coin);
  }
}
