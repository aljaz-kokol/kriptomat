import {Component, OnDestroy, OnInit, ViewChild} from "@angular/core";
import {PurchaseService} from "../../services/purchase.service";
import {Subscription} from "rxjs";
import {Purchase} from "../../models/purchase.model";
import {Coin} from "../../models/coin.model";
import {CoinService} from "../../services/coin.service";
import {Sort} from "@angular/material/sort";
import {MatTable} from "@angular/material/table";
import {DialogService} from "../../services/dialog.service";

@Component({
  selector: 'app-purchases',
  templateUrl: 'purchases.component.html',
  styleUrls: ['purchases.component.css']
})
export class PurchasesComponent implements OnInit, OnDestroy {
  private _purchasesSubscription!: Subscription;
  constructor(private _purchaseService: PurchaseService) {}
  fetchingData = true;

  ngOnInit() {
    this.fetchingData = this._purchaseService.fetchingData;
    this._purchasesSubscription = this._purchaseService.purchasesListener
      .subscribe(purchases => {
        this.fetchingData = false;
      });
  }

  ngOnDestroy() {
    this._purchasesSubscription.unsubscribe();
  }
}
