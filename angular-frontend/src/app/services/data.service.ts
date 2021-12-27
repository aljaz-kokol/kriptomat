import {Injectable} from "@angular/core";
import coinDataList from '../data/web-data.json';

@Injectable({providedIn: 'root'})
export class DataService {
  public getCoins(): {name: string; days: {date: string; price: string}[]}[] {
    return coinDataList;
  }
}
