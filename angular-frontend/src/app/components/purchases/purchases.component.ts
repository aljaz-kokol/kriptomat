import {Component, OnDestroy, OnInit} from "@angular/core";
import {PurchaseService} from "../../services/purchase.service";
import {Subscription} from "rxjs";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-purchases',
  templateUrl: 'purchases.component.html',
  styleUrls: ['purchases.component.css']
})
export class PurchasesComponent implements OnInit, OnDestroy {
  private _purchasesSubscription!: Subscription;
  constructor(private _purchaseService: PurchaseService,
              private _title: Title) {}
  fetchingData = true;

  ngOnInit() {
    this._title.setTitle('Purchases')
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
