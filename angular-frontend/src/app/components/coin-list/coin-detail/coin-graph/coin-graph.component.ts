import {Component, OnDestroy, OnInit} from "@angular/core";
import {Price} from "../../../../models/price.model";
import {BehaviorSubject, Observable, Subscription} from "rxjs";
import {PriceService} from "../../../../services/price.service";
import {CoinDetailService} from "../../../../services/coin-detail.service";

@Component({
  selector: 'app-coin-graph',
  templateUrl: 'coin-graph.component.html',
  styleUrls: ['coin-graph.component.html'],
})
export class CoinGraphComponent implements OnInit, OnDestroy {
  private _coinSubscription: Subscription | null = null;
  prices: Price[] = [];

  private _priceChartListener!: BehaviorSubject<{dataset: {data: any[]; name?: string}[]; labels: string[]}>;

  constructor(private _coinDetailService: CoinDetailService) {}

  ngOnInit() {
    this._initListeners();
    this._coinSubscription = this._coinDetailService.coinChangeListener
      .subscribe(coin => {
        this._priceChartListener.next({
          dataset: [{data: this._coinDetailService.prices}],
          labels: this._coinDetailService.dates
        });
      });
  }

  ngOnDestroy() {
    if (this._coinSubscription)
      this._coinSubscription.unsubscribe();
  }

  get priceChangeObserver(): Observable<{dataset: {data: any[], name?: string}[], labels: string[]}> {
    return this._priceChartListener.asObservable();
  }

  private _initListeners() {
    this._priceChartListener = new BehaviorSubject<{dataset: {data: any[]; name?: string}[]; labels: string[]}>({
      dataset: [{data: this._coinDetailService.prices}],
      labels: this._coinDetailService.dates
    });
  }
}

