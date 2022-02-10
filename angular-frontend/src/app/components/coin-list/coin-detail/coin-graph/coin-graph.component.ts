import {Component, OnDestroy, OnInit} from "@angular/core";
import {Price} from "../../../../models/price.model";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {PriceService} from "../../../../services/price.service";

@Component({
  selector: 'app-coin-graph',
  templateUrl: 'coin-graph.component.html',
  styleUrls: ['coin-graph.component.html'],
})
export class CoinGraphComponent implements OnInit, OnDestroy {
  private _priceSubscription!: Subscription;
  prices: Price[] = [];

  private _priceChartListener!: BehaviorSubject<{dataset: {data: any[]; name?: string}[]; labels: string[]}>;

  constructor(private _priceService: PriceService) {}

  ngOnInit() {
    this._initListeners();
    this._priceSubscription = this._priceService.priceChangeListener
      .subscribe(prices => {
        this.prices = prices.coin;
        this._priceChartListener.next({
          dataset: [{data: this.priceValues}],
          labels: this.dates
        });
      });
  }

  get priceValues(): number[] {
    return this.prices.map(price => price.price);
  }

  ngOnDestroy() {
    this._priceSubscription.unsubscribe();
  }

  get priceChangeObserver(): Observable<{dataset: {data: any[], name?: string}[], labels: string[]}> {
    return this._priceChartListener.asObservable();
  }

  get dates(): string[] {
    return this.prices.map(price => price.date);
  }

  private _initListeners() {
    this._priceChartListener = new BehaviorSubject<{dataset: {data: any[]; name?: string}[]; labels: string[]}>({
      dataset: [{data: this.priceValues}],
      labels: this.dates
    });
  }
}

