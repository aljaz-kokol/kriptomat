import {Component, OnDestroy, OnInit} from "@angular/core";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {Price} from "../../../../../models/price.model";
import {MatButtonToggleChange} from "@angular/material/button-toggle";
import {ChartData} from "../../../../../shared/chart-data.model";
import {CoinDetailService} from "../../../../../services/coin-detail.service";

@Component({
  selector: 'app-percentage-graph',
  templateUrl: 'percentage-graph.component.html',
  styleUrls: ['percentage-graph.component.css']
})
export class PercentageGraphComponent implements OnInit, OnDestroy {
  private _coinSubscription!: Subscription;
  private _percentageChartListener!: BehaviorSubject<ChartData>;

  prices: Price[] = [];


  constructor(private _coinDetailService: CoinDetailService) {}

  ngOnInit() {
    this._initListeners();
    this._coinSubscription = this._coinDetailService.coinChangeListener.subscribe(coin => {
      this._updateChart();
    });
  }

  ngOnDestroy() {
    this._coinSubscription.unsubscribe();
  }

  get toggleOptions(): string[] {
    return Array.from(this._coinDetailService.percentChartToggleOptions);
  }

  get selectedToggleOptions(): string[] {
    return this._coinDetailService.selectedPercentChartOptions;
  }

  get dates(): string[] {
    return this.prices.map(price => price.date);
  }

  get percentageChangeObserver(): Observable<ChartData>  {
    return this._percentageChartListener.asObservable();
  }

  onToggle(change: MatButtonToggleChange) {
    this._coinDetailService.setToggleItems(change.value);
    this._updateChart();
  }

  private _initListeners() {
    this._percentageChartListener = new BehaviorSubject<ChartData>({
      dataset: this._coinDetailService.pricePercentagesChartDataset,
      labels: this._coinDetailService.dates
    });
  }

  private _updateChart() {
    this._percentageChartListener.next({
      dataset: this._coinDetailService.pricePercentagesChartDataset,
      labels: this._coinDetailService.dates
    });
  }
}
