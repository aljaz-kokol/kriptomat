import {ApiCoin, Coin} from "./coin.model";
import {ApiPrice, Price} from "./price.model";

export interface ApiPurchase {
  coin: ApiCoin,
  boughtPrice: number;
  prices: ApiPrice[];
  date: Date;
  originalDiffLimit: number | null;
  maxDiffLimit: number | null;
}

export class Purchase {
  constructor(public coin: Coin,
              public boughtPrice: number,
              private _prices: Price[],
              public date: Date,
              public ogDiffLimit: number | null,
              public maxDiffLimit: number | null) {}

  public get dateStr(): string {
    const dateStr = this.date.toLocaleDateString().split('.').map(datePart => datePart.trim().padStart(2, '0')).join ('.');
    return `${dateStr}`;
  }

  public get prices(): Price[] {
    return [...this._prices];
  }

  public get percentChange(): number {
    if (this.coin.price == this.boughtPrice)
      return 0;
    return ((this.coin.price * 100 / this.boughtPrice) - 100);
  }

  public get maxPercentChange(): number {
    if (this.prices.length > 0) {
      const maxPrice = this._prices.map(price => price.price).sort((n1, n2) => n2 - n1)[0];
      const maxPercent = (maxPrice * 100 / this.boughtPrice) - 100;
      return this.percentChange - maxPercent;
    }
    return 0;
  }

  public get percentValues(): number[] {
    const percents: number[] = [];
    for (const price of this._prices) {
      percents.push((price.price * 100 / this.boughtPrice) - 100);
    }
    return percents;
  }

  public get maxPercentChangeColor(): string {
    if (this.maxPercentChange > 0)
      return '#4caf50';
    else if (this.maxPercentChange < 0)
      return '#f50057';
    return '#29434e';
  }

  public get percentChangeColor(): string {
    if (this.percentChange > 0)
      return '#4caf50';
    else if (this.percentChange < 0)
      return '#f50057';
    return '#29434e';
  }

  public static fromApiPurchase(apiPurchase: ApiPurchase): Purchase {
    return new Purchase(
      Coin.fromApiCoin(apiPurchase.coin),
      apiPurchase.boughtPrice,
      Price.fromApiPriceList(apiPurchase.prices),
      new Date(apiPurchase.date),
      apiPurchase.originalDiffLimit,
      apiPurchase.maxDiffLimit  
    );
  }

  public static fromApiPurchaseList(apiPurchaseList: ApiPurchase[]): Purchase[] {
    const purchases: Purchase[] = [];
    for (const apiPurchase of apiPurchaseList)
      purchases.push(Purchase.fromApiPurchase(apiPurchase));
    return purchases;
  }
}
