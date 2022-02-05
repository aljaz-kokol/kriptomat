import {ApiPrice, Price} from "../models/price.model";
import {ApiHttpService} from "./core/api-http.service";
import {ApiEndpointService} from "./core/api-endpoint.service";
import {map, Observable, Subject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class PriceService {
  private _priceChangeListener = new Subject<Price[]>()
  private _allPrices: Price[] = [];
  private _coinPrices: Price[] = [];

  constructor(private _apiHttp: ApiHttpService,
              private _apiEndpoint: ApiEndpointService) {}

  fetchCoinPrices(coinId: string): void {
    this._apiHttp.get<ApiPrice[]>(this._apiEndpoint.getCoinPricesEndpoint(coinId))
      .pipe(map(Price.fromApiPriceList)).subscribe(prices => {
        this._coinPrices = prices;
        this._priceChangeListener.next(this._coinPrices);
    });
  }

  fetchAllPrices(): void {
    this._apiHttp.get<ApiPrice[]>(this._apiEndpoint.getPriceListEndpoint())
      .pipe(map(Price.fromApiPriceList)).subscribe(prices => {
        this._allPrices = prices;
        console.log(this._allPrices);
      });
  }

  clear(): void {
    this._coinPrices = [];
    this._priceChangeListener.next(this._coinPrices);
  }

  get priceChangeListener() {
    return this._priceChangeListener.asObservable();
  }

  get days(): string[] {
    return [...new Set(this._coinPrices.map(price => price.date))];
  }

  get months(): string[] {
    return [...new Set(this._coinPrices.map(price => price.dateMonth))];
  }

  get years(): string[] {
    return [...new Set(this._coinPrices.map(price => price.dateYear))];
  }

  get sortReady(): boolean {
    return this._allPrices.length > 0;
  }

  filterByDate(dates: string[]) {
    if (dates.length > 0) {
      const prices: Price[] = [];
      for (const date of dates) {
        prices.push(...this._coinPrices.filter(prices => prices.date == date || prices.dateMonth == date || prices.dateYear == date));
      }
      this._priceChangeListener.next(prices.sort((p1, p2) => new Date(p2._date).getTime() - new Date(p1._date).getTime()));
    } else {
      this._priceChangeListener.next(this._coinPrices);
    }
  }
}
