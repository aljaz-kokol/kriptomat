import {Component, OnInit} from "@angular/core";
import {BehaviorSubject, Observable, Subject, Subscription} from "rxjs";
import {PurchaseService} from "../../../services/purchase.service";
import {Purchase} from "../../../models/purchase.model";
import {ChartData} from "../../../shared/chart-data.model";
import {MatButtonToggleChange} from "@angular/material/button-toggle";

@Component({
  selector: 'app-purchase-graph',
  templateUrl: 'purchase-graph.component.html',
  styleUrls: ['purchase-graph.component.css']
})
export class PurchaseGraphComponent implements OnInit {
  private _purchaseSubscription!: Subscription;
  private _purchaseChartChange!: BehaviorSubject<ChartData>;
  purchases: Purchase[] = [];

  constructor(private _purchaseService: PurchaseService) {}

  ngOnInit() {
    this.purchases = this._purchaseService.purchases;
    this._purchaseChartChange = new BehaviorSubject<ChartData>({
      dataset: this._chartDataset,
      labels: this._dates
    });
    this._purchaseSubscription = this._purchaseService.purchasesListener
      .subscribe(purchases => {
        this.purchases = purchases;
        this._purchaseChartChange.next({
          dataset: this._chartDataset,
          labels: this._dates
        });
      });
  }

  get purchaseChangeListener(): Observable<ChartData> {
    return this._purchaseChartChange.asObservable();
  }

  // Return dates of purchase that has been active for the longest time
  private get _dates(): string[] {
    return PurchaseGraphComponent._getDates(this.purchases);
  }

  private get _chartDataset(): {data: any[], name?: string}[] {
    return PurchaseGraphComponent._getChartDataset(this.purchases);
  }

  private static _getChartDataset(purchases: Purchase[]): {data: any[], name?: string}[] {
    const dataset: {data: any[], name?: string}[] = [];
    for (const purchase of purchases) {
      dataset.push({
        data: purchase.percentValues,
        name: purchase.coin.name
      });
    }
    return dataset;
  }

  private static _getDates(purchases: Purchase[]): string[] {
    if (purchases.length > 0)
      return purchases.sort((p1: Purchase, p2: Purchase) => p2.prices.length - p1.prices.length)[0].prices.map(price => price.date);
    return [];
  }

  onToggleChange(data: MatButtonToggleChange): void {
    const purchases = this.purchases.filter(purchase => data.value.indexOf(purchase.coin.name) < 0);

    this._purchaseChartChange.next({
      dataset: PurchaseGraphComponent._getChartDataset(purchases),
      labels: PurchaseGraphComponent._getDates(purchases)
    });
  }
}

