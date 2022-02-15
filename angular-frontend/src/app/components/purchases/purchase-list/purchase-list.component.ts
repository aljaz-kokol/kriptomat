import {Component, Input, ViewChild} from "@angular/core";
import {Subscription} from "rxjs";
import {MatTable} from "@angular/material/table";
import {Purchase} from "../../../models/purchase.model";
import {PurchaseService} from "../../../services/purchase.service";
import {DialogService} from "../../../services/dialog.service";
import {CoinService} from "../../../services/coin.service";
import {Sort} from "@angular/material/sort";
import {BreakpointObserver} from "@angular/cdk/layout";
import {Router} from "@angular/router";

@Component({
  selector: 'app-purchase-list',
  templateUrl: 'purchase-list.component.html',
  styleUrls: ['purchase-list.component.css']
})
export class PurchaseListComponent {
  private _purchasesSubscription!: Subscription;
  @ViewChild('purchaseTable') private _purchaseTable!: MatTable<any>;
  private _showDeleteSpinner = {
    show: true,
    element: ''
  };
  fetchingData = true;
  mobileView = false;

  columnNames: string[] = ['logo', 'name', 'date', 'price', 'percent', 'max-percent', 'action'];
  purchases: Purchase[] = [];
  activeSortHeader: string = '';

  constructor(private _purchaseService: PurchaseService,
              private _dialogService: DialogService,
              private _coinServise: CoinService,
              private _breakPointObserver: BreakpointObserver,
              private _router: Router) {}

  ngOnInit() {
    this.purchases = this._purchaseService.purchases;
    this.fetchingData = this._purchaseService.fetchingData;
    this._purchasesSubscription = this._purchaseService.purchasesListener
      .subscribe(purchases => {
        this.purchases = purchases;
        this.fetchingData = false;
      });
    this._breakPointObserver.observe(['(max-width: 480px)'])
      .subscribe(state => {
        if (state.matches) {
           this.columnNames = ['name', 'price', 'percent', 'max-percent', 'action'];
          this.mobileView = true;
        }
        else {
          this.columnNames = ['logo', 'name', 'date', 'price', 'percent', 'max-percent', 'action']
          this.mobileView = false;
        }
      });
  }

  navigateToCin(purchase: Purchase) {
    this._dialogService.openChoiceDialog({
      title: 'Navigate',
      body: `Are you sure you want to navigate to "${purchase.coin.name}" detail page?`
    }).subscribe(result => {
      if (result)
        this._router.navigate(['coin', purchase.coin.id]);
    })
  }

  ngOnDestroy() {
    this._purchasesSubscription.unsubscribe();
  }

  isActiveSortHeader(key: string): boolean {
    return this.activeSortHeader === key;
  }

  showDeleteSpinner(purchase: Purchase) {
    return this._showDeleteSpinner.show && this._showDeleteSpinner.element === purchase.coin.id;
  }

  percentChange(purchase: Purchase): string {
    if (this.mobileView)
      return purchase.percentChange.toFixed(1);
    return purchase.percentChange.toFixed(4);
  }

  maxPercentChange(purchase: Purchase): string {
    if (this.mobileView)
      return purchase.maxPercentChange.toFixed(1);
    return purchase.maxPercentChange.toFixed(4);
  }

  boughtPrice(purchase: Purchase): string {
    if (this.mobileView)
      return purchase.boughtPrice.toFixed(1);
    return purchase.boughtPrice.toString();
  }

  onSortChange(event: Sort) {
    const directions =  new Map<string, number>([
      ['asc', 1],
      ['desc', -1],
    ]);
    this.activeSortHeader = event.active;
    this._purchaseService.sortByKey(event.active, directions.get(event.direction) ?? 0)
    this._purchaseTable.renderRows();
  }

  onSell(purchase: Purchase, event: Event) {
    event.stopPropagation();
    this._dialogService.openChoiceDialog({
      title: 'Confirm sell',
      body: `Are you sure you want to sell ${purchase.coin.name}`
    }).subscribe(response => {
      if (response) {
        this._showDeleteSpinner = {
          show: true,
          element: purchase.coin.id
        };
        this._coinServise.sellCoin(purchase.coin.id)
          .subscribe(() => {
            this._purchaseService.removePurchase(purchase.coin.id);
            this._purchaseTable.renderRows();
            this._showDeleteSpinner.show = false;
          })
      }
    });
  }

  onSearch(searchStr: string) {
    this._purchaseService.filterByName(searchStr);
    if (this._purchaseTable)
      this._purchaseTable.renderRows();
  }
}
