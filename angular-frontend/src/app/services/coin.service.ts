import { Injectable } from '@angular/core';
import {ApiEndpointService} from "./core/api-endpoint.service";
import {ApiHttpService} from "./core/api-http.service";
import {ApiCoin, Coin} from "../models/coin.model";
import {map, Observable} from "rxjs";
import {ApiPrice, Price} from "../models/price.model";

@Injectable({providedIn: 'root'})
export class CoinService {
  constructor(private _apiEndpoint: ApiEndpointService,
              private _apiHttp: ApiHttpService) {}

  public getCoinList(): Observable<Coin[]> {
    return this._apiHttp.get<ApiCoin[]>(this._apiEndpoint.getCoinsListEndpoint())
      .pipe(map(Coin.fromApiCoinList));
  }

  public getCoinById(id: string): Observable<{ coin: Coin, prices: Price[] }> {
    return this._apiHttp.get<{ coin: ApiCoin, prices: ApiPrice[] }>(this._apiEndpoint.getCoinByIdEndpoint(id))
      .pipe(map(data => {
        return {coin: Coin.fromApiCoin(data.coin), prices: Price.fromApiPriceList(data.prices)};
      }));
  }
}
