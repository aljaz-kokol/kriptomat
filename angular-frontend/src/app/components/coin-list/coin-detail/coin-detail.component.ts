import {Component, OnDestroy, OnInit} from "@angular/core";
import {ActivatedRoute, Router, RouterStateSnapshot} from "@angular/router";
import {Coin} from "../../../models/coin.model";
import {Observable, Subscription} from "rxjs";
import {Title} from "@angular/platform-browser";
import {PopupService} from "../../../services/popup.service";
import {CoinDetailService} from "../../../services/coin-detail.service";
import {DeactivateComponent} from "../../../services/guards/deactivate/deactivate.guard";
import {DialogService} from "../../../services/dialog.service";

@Component({
  selector: 'app-coin-detail',
  templateUrl: 'coin-detail.component.html',
  styleUrls: ['coin-detail.component.css'],
  providers: [
    CoinDetailService
  ]
})
export class CoinDetailComponent implements OnInit, OnDestroy, DeactivateComponent {
  private _coinSubscription: Subscription | null = null;
  error: Error | null = null;
  coin: Coin | null = null;

  constructor(private _route: ActivatedRoute,
              private _title: Title,
              private _router: Router,
              private _popupService: PopupService,
              private _dialogService: DialogService,
              private _coinDetailService: CoinDetailService) {}

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      const coinId: string = params.get('coinId') ?? '';
      const groupId: string = params.get('groupId') ?? '';
      this._coinDetailService.setCoin(coinId, groupId);
      this._coinSubscription = this._coinDetailService.coinChangeListener
        .subscribe(coin => {
          this.coin = coin;
        })
    });
  }

  ngOnDestroy() {
    if (this._coinSubscription)
      this._coinSubscription.unsubscribe();
  }

  canDeactivate(nextState?: RouterStateSnapshot): Observable<boolean> | boolean {
    if (nextState) {
      const goingOutsideCoinDetail =  nextState?.url.split('/').indexOf('coin') < 0;
      if (this._coinDetailService.addedCoins.length > 1 && goingOutsideCoinDetail) {
        return this._dialogService.openChoiceDialog({
          title: 'Exit without saving',
          body: 'Are you sure you want to exit without saving'
        });
      }
    }
    return true;
  }

  get showSpinner(): boolean {
    return this._coinDetailService.fetchingData;
  }

  get showContent(): boolean {
    return !this.error && this.coin !== null;
  }

  get tabCoins(): string[] {
    return this._coinDetailService.addedCoins.map(coin => coin.id);
  }

  onAdd(coins: Coin[]): void {
    this._coinDetailService.addCoins(coins);
  }
}
