import { Injectable } from '@angular/core';
import {ApiEndpointService} from "./core/api-endpoint.service";
import {ApiHttpService} from "./core/api-http.service";
import {ApiCoin, Coin} from "../models/coin.model";
import {map} from "rxjs";

@Injectable({providedIn: 'root'})
export class CoinService {
  constructor(private _apiEndpoint: ApiEndpointService,
              private _apiHttp: ApiHttpService) {}

  public getCoinList() {
    return this._apiHttp.get<ApiCoin[]>(this._apiEndpoint.getCoinsListEndpoint())
      .pipe(map(Coin.fromApiCoinList));
  }
}
