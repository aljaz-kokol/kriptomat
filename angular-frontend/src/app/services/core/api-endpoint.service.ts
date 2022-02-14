import {Injectable} from "@angular/core";
import { API_ENDPOINT } from '../../utils/constants.util';
import {UrlBuilder} from '../../shared/url-builder';

@Injectable({providedIn: 'root'})
export class ApiEndpointService {
  private _createUrl(actions: string[]): string {
    const urlBuilder = new UrlBuilder(API_ENDPOINT, actions);
    return urlBuilder.toString();
  }

  // == COIN ENDPOINTS ==
  public getCoinsListEndpoint(): string {
    return this._createUrl(['coins']);
  }

  public getCoinByIdEndpoint(coinId: string) {
    return this._createUrl(['coins', coinId]);
  }

  public getCoinPricesEndpoint(coinId: string) {
    return this._createUrl(['coins', coinId, 'prices']);
  }

  // == PRICE ENDPOITNS ==
  public getPriceListEndpoint(): string {
    return this._createUrl(['prices']);
  }

  // == PURCHASE ENDPOITNS ==
  public getPurchasesEndpoint(): string {
    return this._createUrl(['purchases']);
  }

  public getPurchaseByCoinIdEndpoint(coinId: string): string {
    return this._createUrl(['purchases', coinId]);
  }

  // == GROUP ENDPOINTS ==
  public getGroupListEndpoint(): string {
    return this._createUrl(['groups']);
  }
}
