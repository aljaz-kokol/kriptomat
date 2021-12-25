import { Injectable } from '@angular/core';
import {Coin} from "../models/coin.model";
import {readAndParseJson} from "@angular/cli/utilities/json-file";

@Injectable({providedIn: 'root'})
export class CoinService {
  public get coinsBaseData(): Coin[] {
    return readAndParseJson('../data/web-data.json').map(data => Coin.fromJson(data));
  }
}
