import {UrlBuilder} from "../shared/url-builder";
import {API_ENDPOINT} from "../utils/constants.util";

export interface ApiCoin {
  _id: string;
  name: string;
  connection: string;
  image: string;
}

export class Coin {
  constructor(public id: string,
              public name: string,
              public connection: string,
              private _image: string) {}

  public get image(): string {
    const urlBuilder = new UrlBuilder(API_ENDPOINT, ['images', this._image]);
    return urlBuilder.toString();
  }

  public static fromApiCoin(apiCoin: ApiCoin): Coin {
    return new Coin(apiCoin._id, apiCoin.name, apiCoin.connection, apiCoin.image);
  }

  public static fromApiCoinList(apiCoins: ApiCoin[]): Coin[] {
    const coins: Coin[] = []
    for (const apiCoin of apiCoins) {
      coins.push(Coin.fromApiCoin(apiCoin));
    }
    return coins;
  }
}
