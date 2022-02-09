import {ApiPrice, Price} from "../models/price.model";
import {ApiHttpService} from "./core/api-http.service";
import {ApiEndpointService} from "./core/api-endpoint.service";
import {map, Subject} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable({providedIn: 'root'})
export class PriceService {
  private _priceChangeListener = new Subject<Price[]>()
  private _allPercentages: {coin: string; values: number[]}[] = [];
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
        const coinIDList = [...new Set(prices.map(price => price.coin))];
        for (const coinID of coinIDList) {
          const coinPrices = prices.filter(price => price.coin === coinID);
          const lastIndex = coinPrices.length - 1;
          if (lastIndex < 0) {
            this._allPercentages.push({coin: coinID, values: []});
            continue;
          }
          this._allPercentages.push({
            coin: coinID,
            values: coinPrices.map(price => (price.price * 100 / coinPrices[lastIndex].price) - 100)
          });
        }
      });
  }

  getPercentageList(percentPeriod: number, period: number): {coin: string; values: number[]}[] {
    let percentageList: {coin: string; values: number[]}[] = [];

    this._allPercentages.forEach(coin => {
      const percentages = coin.values.slice(0, period == 0 ? coin.values.length - 1 : period + 1);
      const percentValues: number[] = [];
      percentages.forEach((percent: number, index: number) => {
        if (percentPeriod + index < coin.values.length && percentPeriod !== 0)
          percentValues.push(percent - coin.values[index + percentPeriod]);
        else
          percentValues.push(percent);
      });
      const sorted = percentValues.sort((n1, n2) => n2 - n1);
      percentageList.push({coin: coin.coin, values: sorted});
    });
    return percentageList;
  }

  getPercentageMaxForCoin(coinId: string, percentPeriod: number, period: number): number {
    const values = this.getPercentageList(percentPeriod, period).filter(el => el.coin === coinId)[0].values;
    return values[0];
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
    return this._allPercentages.length > 0;
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

  private _swap(items: number[], leftIndex: number, rightIndex: number){
    const temp = items[leftIndex];
    items[leftIndex] = items[rightIndex];
    items[rightIndex] = temp;
  }

  private _partition(items: number[], left: number, right: number): number {
    const pivot = items[Math.floor((right + left) / 2)]; //middle element
    let  i = left; //left pointer
    let  j = right; //right pointer
    while (i <= j) {
      while (items[i] < pivot) {
        i++;
      }
      while (items[j] > pivot) {
        j--;
      }
      if (i <= j) {
        this._swap(items, i, j); //sawpping two elements
        i++;
        j--;
      }
    }
    return i;
  }

  private _quickSort(items: number[], left: number, right: number) {
    let index;
    if (items.length > 1) {
      index = this._partition(items, left, right); //index returned from partition
      if (left < index - 1) { //more elements on the left side of the pivot
        this._quickSort(items, left, index - 1);
      }
      if (index < right) { //more elements on the right side of the pivot
        this._quickSort(items, index, right);
      }
    }
    return items;
  }

}
