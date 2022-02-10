import {Component, OnDestroy, OnInit} from "@angular/core";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {Price} from "../../../../../../models/price.model";
import {PriceService} from "../../../../../../services/price.service";
import {MatButtonToggleChange} from "@angular/material/button-toggle";
import {ChartData} from "../../../../../../shared/chart-data.model";

@Component({
  selector: 'app-percentage-graph',
  templateUrl: 'percentage-graph.component.html',
  styleUrls: ['percentage-graph.component.css']
})
export class PercentageGraphComponent implements OnInit, OnDestroy {
  private _percentageSubscription!: Subscription;
  private _percentageChartListener!: BehaviorSubject<ChartData>;
  private _selectedOptions: string[] = [];
  private _btcPercents: number[] = [];
  private _toggleOptions = new Map<string, number>([
    ['original', 0],
    ['2h', 1],
    ['4h', 2],
    ['12h', 6],
    ['1 day', 12],
    ['2 days', 24],
    ['3 days', 36],
    ['4 days', 48],
    ['5 days', 60],
    ['6 days', 72],
    ['1 week', 84],
    ['2 weeks', 168],
    ['3 weeks', 252],
    ['4 weeks', 336],
  ]);

  prices: Price[] = [];


  constructor(private _priceService: PriceService) {}

  ngOnInit() {
    this._initListeners();
    this._percentageSubscription = this._priceService.priceChangeListener
      .subscribe(prices => {
        this.prices = prices.coin;
        this._btcPercents = prices.btc;
        this._percentageChartListener.next({
          dataset: this.percentageValues,
          labels: this.dates
        });
    })
  }

  ngOnDestroy() {
    this._percentageSubscription.unsubscribe();
  }

  get toggleOptions(): string[] {
    return Array.from(this._toggleOptions.keys());
  }

  get dates(): string[] {
    return this.prices.map(price => price.date);
  }

  get percentageValues(): {data: number[], name: string}[] {
    const lastIndex = this.prices.length - 1;
    if (lastIndex < 0) return [];
    const basePrice = this.prices[lastIndex].price;

    const percentages = this.prices.map(price => (price.price * 100 / basePrice) - 100);
    const values: {data: number[], name: string}[] = [];

    if (this._selectedOptions.length > 0) {
      for (const option of this._selectedOptions) {
        if (option === 'bitcoin') {
          values.push({data: this._btcPercents, name: 'Bitcoin'});
        } else {
          const diff = this._toggleOptions.get(option) ?? 0;
          const data: number[] = [];
          percentages.forEach((percent: number, index: number) => {
            if (index + diff < percentages.length && diff !== 0)
              data.push(percent - percentages[index + diff]);
            else if (diff == 0) {
              data.push(percent);
            }
          });
          values.push({data: data, name: option});
        }
      }
    } else {
      values.push({data: percentages, name: this.toggleOptions[0]})
    }
    return values;
  }

  get percentageChangeObserver(): Observable<ChartData>  {
    return this._percentageChartListener.asObservable();
  }

  onToggle(change: MatButtonToggleChange) {
    console.log(change.value)
    this._selectedOptions = change.value;
    this._percentageChartListener.next({
      dataset: this.percentageValues,
      labels: this.dates
    });
  }


  private _initListeners() {
    this._percentageChartListener = new BehaviorSubject<ChartData>({
      dataset: this.percentageValues,
      labels: this.dates
    });
  }
}
