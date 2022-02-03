import {Component, OnDestroy, OnInit} from "@angular/core";
import {Price} from "../../../../models/price.model";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {PriceService} from "../../../../services/price.service";

@Component({
  selector: 'app-price-graph',
  templateUrl: 'price-graph.component.html',
  styleUrls: ['price-graph.component.html'],
})
export class PriceGraphComponent implements OnInit, OnDestroy {
  private _priceSubscription!: Subscription;
  prices: Price[] = [];

  private _priceChartListener!: BehaviorSubject<{data: number[], labels: string[]}>;
  private _percentageChartListener!: BehaviorSubject<{data: number[], labels: string[]}>;

  constructor(private _priceService: PriceService) {}

  ngOnInit() {
    this._initListeners();
    this._priceSubscription = this._priceService.priceChangeListener
      .subscribe(prices => {
        this.prices = prices;
        this._percentageChartListener.next({data: this.percentageValues, labels: this.dates});
        this._priceChartListener.next({data: this.priceValues, labels: this.dates});
      });
  }

  get priceValues(): number[] {
    return this.prices.map(price => price.price);
  }

  get percentageValues(): number[] {
    const lastIndex = this.prices.length - 1;
    if (lastIndex < 0) return [];
    const basePrice = this.prices[lastIndex].price;
    return this.prices.map(price => (price.price * 100 / basePrice) - 100);
  }

  ngOnDestroy() {
    this._priceSubscription.unsubscribe();
  }

  get priceChangeObserver(): Observable<{data: number[], labels: string[]}> {
    return this._priceChartListener.asObservable();
  }

  get percentageChangeObserver(): Observable<{data: number[], labels: string[]}> {
    return this._percentageChartListener.asObservable();
  }

  get showContent(): boolean {
    return this.prices != null;
  }

  get dates(): string[] {
    return this.prices.map(price => price.date);
  }

  private _initListeners() {
    this._percentageChartListener = new BehaviorSubject<{data: number[], labels: string[]}>({
      data: this.percentageValues,
      labels: this.dates
    });

    this._priceChartListener = new BehaviorSubject<{data: number[], labels: string[]}>({
      data: this.priceValues,
      labels: this.dates
    });
  }
}

