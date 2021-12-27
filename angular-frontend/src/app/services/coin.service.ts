import {Injectable} from "@angular/core";
import coinDataList from '../data/web-data.json';
import {HttpClient} from "@angular/common/http";
import {filter, Observable} from "rxjs";
import {Coin} from "../models/coin.model";

@Injectable({providedIn: 'root'})
export class CoinService {
  constructor(private _http: HttpClient) {}

  getCoins(): Observable<{names: string[]}> {
    return this._http.get<{names: string[]}>('http://localhost:3000/api/coins');
  }

  getCoinByName(coinName: string): Observable<Coin> {
    return this._http.get<Coin>(`http://localhost:3000/api/coins/${coinName}`)
  }

  getDates(): Observable<{dates: string[]}> {
    return this._http.get<{dates: string[]}>('http://localhost:3000/api/coins/dates');
  }
}
