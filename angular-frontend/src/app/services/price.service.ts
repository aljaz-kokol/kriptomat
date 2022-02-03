import {ApiPrice, Price} from "../models/price.model";
import {ApiHttpService} from "./core/api-http.service";
import {ApiEndpointService} from "./core/api-endpoint.service";
import {map, Subject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class PriceService {
  private _priceChangeListener = new Subject<Price[]>()
  private _prices: Price[] = [];

  constructor(private _apiHttp: ApiHttpService,
              private _apiEndpoint: ApiEndpointService) {}

  fetchPrices(coinId: string): void {
    this._apiHttp.get<ApiPrice[]>(this._apiEndpoint.getCoinPricesEndpoint(coinId))
      .pipe(map(Price.fromApiPriceList)).subscribe(prices => {
        this._prices = prices;
        this._priceChangeListener.next(this._prices);
    });
  }

  clear(): void {
    this._prices = [];
    this._priceChangeListener.next(this._prices);
  }

  get priceChangeListener() {
    return this._priceChangeListener.asObservable();
  }

  get days(): string[] {
    return [...new Set(this._prices.map(price => price.date))];
  }

  get months(): string[] {
    return [...new Set(this._prices.map(price => price.dateMonth))];
  }

  get years(): string[] {
    return [...new Set(this._prices.map(price => price.dateYear))];
  }

  filterByDate(dates: string[]) {
    if (dates.length > 0) {
      const prices: Price[] = [];
      for (const date of dates) {
        prices.push(...this._prices.filter(prices => prices.date == date || prices.dateMonth == date || prices.dateYear == date));
      }
      this._priceChangeListener.next(prices);
    } else {
      this._priceChangeListener.next(this._prices);
    }
  }
}
