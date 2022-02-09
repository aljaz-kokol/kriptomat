import {Injectable} from '@angular/core';
import {ApiEndpointService} from "./core/api-endpoint.service";
import {ApiHttpService} from "./core/api-http.service";
import {ApiCoin, Coin} from "../models/coin.model";
import {map, Observable, Subject} from "rxjs";
import {ApiPurchase, Purchase} from "../models/purchase.model";
import {PriceService} from "./price.service";

@Injectable({providedIn: 'root'})
  export class CoinService {
  private _coinsChange = new Subject<Coin[]>();
  private _coins: Coin[] = [];
  sortPeriods = {percent: 0, time: 1};

  constructor(private _apiEndpoint: ApiEndpointService,
              private _apiHttp: ApiHttpService,
              private _priceService: PriceService) {
    this.getCoinList().subscribe(coins => {
      this._coins = coins;
      this._coinsChange.next(this._coins);
    })
  }

  public get coins(): Coin[] {
    return [...this._coins];
  }

  public coinsFromIdList(idList: string[]) {
    return this._coins.filter(coin => idList.indexOf(coin.id) >= 0)
  }

  public filterByName(filter: string): void {
    filter = filter.trim().toLowerCase();
    const coins = this._coins.filter(coin => coin.name.trim().toLowerCase().indexOf(filter) >= 0);
    this._coinsChange.next(coins);
  }

  public sortByPercent(percentPeriod: number, timePeriod: number): void {
    this.sortPeriods.percent = percentPeriod;
    this.sortPeriods.time = timePeriod;
    this._coins = this._coins.sort((c1: Coin, c2: Coin) => {
        const max1 = this._priceService.getPercentageMaxForCoin(c1.id, percentPeriod, timePeriod);
        const max2 = this._priceService.getPercentageMaxForCoin(c2.id, percentPeriod, timePeriod);
        return max2 - max1;
    });
    this._coinsChange.next(this._coins);
  }

  public get coinChangeListener(): Observable<Coin[]> {
    return this._coinsChange.asObservable();
  }

  public getCoinList(): Observable<Coin[]> {
    return this._apiHttp.get<ApiCoin[]>(this._apiEndpoint.getCoinsListEndpoint())
      .pipe(map(Coin.fromApiCoinList));
  }

  public getCoinById(id: string): Observable<Coin> {
    return this._apiHttp.get<ApiCoin>(this._apiEndpoint.getCoinByIdEndpoint(id))
      .pipe(map(Coin.fromApiCoin));
  }

  public buyCoin(id: string): Observable<{message: string; purchase: Purchase}> {
    return this._apiHttp.post<{message: string; purchase: ApiPurchase}>(this._apiEndpoint.getCoinByIdEndpoint(id), {})
      .pipe(map(el => {
        return {message: el.message, purchase: Purchase.fromApiPurchase(el.purchase)}
      }));
  }

  public sellCoin(id: string): Observable<void> {
    return this._apiHttp.delete(this._apiEndpoint.getCoinByIdEndpoint(id));
  }
}
