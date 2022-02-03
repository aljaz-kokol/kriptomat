import { Injectable } from '@angular/core';
import {ApiEndpointService} from "./core/api-endpoint.service";
import {ApiHttpService} from "./core/api-http.service";
import {ApiCoin, Coin} from "../models/coin.model";
import {map, Observable} from "rxjs";

@Injectable({providedIn: 'root'})
  export class CoinService {
  constructor(private _apiEndpoint: ApiEndpointService,
              private _apiHttp: ApiHttpService) {}

  public getCoinList(): Observable<Coin[]> {
    return this._apiHttp.get<ApiCoin[]>(this._apiEndpoint.getCoinsListEndpoint())
      .pipe(map(Coin.fromApiCoinList));
  }

  public getCoinById(id: string): Observable<Coin> {
    return this._apiHttp.get<ApiCoin>(this._apiEndpoint.getCoinByIdEndpoint(id))
      .pipe(map(Coin.fromApiCoin));
  }
}
