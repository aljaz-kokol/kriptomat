import {Injectable} from "@angular/core";
import {map, Observable, Subject} from "rxjs";
import {ApiPurchase, Purchase} from "../models/purchase.model";
import {ApiHttpService} from "./core/api-http.service";
import {ApiEndpointService} from "./core/api-endpoint.service";
import {CoinService} from "./coin.service";
import {Coin} from "../models/coin.model";

@Injectable({providedIn: 'root'})
export class PurchaseService {
  private _purchasesChange = new Subject<Purchase[]>();
  private _purchases: Purchase[] = [];
  fetchingData = true;

  constructor(private _apiHttp: ApiHttpService,
              private _apiEndpoint: ApiEndpointService,
              private _coinService: CoinService) {
    this.fetchingData = true;
    this.getPurchases().subscribe(purchases => {
      this._purchases = purchases;
      this._purchasesChange.next(this._purchases);
      this.fetchingData = false;
    });
  }

  get purchases(): Purchase[] {
    return [...this._purchases];
  }

  get purchasesListener(): Observable<Purchase[]> {
    return this._purchasesChange.asObservable();
  }

  filterByName(filterStr: string) {
    filterStr = filterStr.toLowerCase().trim();
    const purchases = this.purchases.filter(purchase => purchase.coin.name.trim().toLowerCase().indexOf(filterStr) >= 0);
    this._purchasesChange.next(purchases);
  }

  sortByKey(key: string, direction: number) {
      this._purchases = this._purchases.sort((p1: Purchase, p2: Purchase) => {
        if (key === 'name')
          return direction * (p1.coin.name.localeCompare(p2.coin.name));
        else if (key === 'date')
          return direction * (p1.date.getUTCDate() - p2.date.getUTCDate());
        else if (key === 'start-price')
          return direction * (p1.boughtPrice - p2.boughtPrice);
        else if (key === 'percent-change')
          return direction * (p1.percentChange - p2.percentChange);
        else if (key === 'max-percent-change')
          return direction * (p1.maxPercentChange - p2.maxPercentChange);

        return -1;
      });
      this._purchasesChange.next(this._purchases);
  }

  coinIsBought(coinId: string) {
    const index = this._purchases.findIndex(el => el.coin.id == coinId);
    return index>= 0;
  }

  getPurchases(): Observable<Purchase[]> {
    return this._apiHttp.get<ApiPurchase[]>(this._apiEndpoint.getPurchasesEndpoint())
      .pipe(map(Purchase.fromApiPurchaseList));
  }

  removePurchase(coinId: string): void {
    const index = this._purchases.findIndex(el => el.coin.id == coinId);
    if (index >= 0) {
      this._purchases.splice(index, 1);
      this._purchasesChange.next(this._purchases);
    }
  }

  addPurchase(purchase: Purchase): void {
    this._purchases.push(purchase);
    this._purchasesChange.next(this._purchases);
  }
}
