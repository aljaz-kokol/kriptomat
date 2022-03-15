import {UrlBuilder} from "../shared/url-builder";
import {API_ENDPOINT} from "../utils/constants.util";
import {Price} from "./price.model";

export interface ApiCoin {
  _id: string;
  name: string;
  connection: string;
  lastPrice: number;
  image: string;
}

export class Coin {
  constructor(public id: string,
              public name: string,
              public connection: string,
              public price: number,
              private _image: string) {}

  public get image(): string {
    return this._image;
  }

  public static fromApiCoin(apiCoin: ApiCoin): Coin {
    return new Coin(apiCoin._id, apiCoin.name, apiCoin.connection, apiCoin.lastPrice, apiCoin.image);
  }

  public static fromApiCoinList(apiCoins: ApiCoin[]): Coin[] {
    const coins: Coin[] = []
    for (const apiCoin of apiCoins) {
      coins.push(Coin.fromApiCoin(apiCoin));
    }
    return coins;
  }
}
