export interface ApiPrice {
  _id: string;
  price: number;
  date: Date;
  coin_id: string;
}

export class Price {
  constructor(private _price: number,
              public _date: Date,
              public coin: string) {}

  public get priceStr(): string {
    const priceParts = this._price.toString().replace('.', ',').split(',');
    // Add '.' on every thousand place
    for (let i = priceParts[0].length - 1; i >= 0; i--) {
      if ((i + 1) % 3 == 0) {
        priceParts[0] = priceParts[0].substring(0, i) + '.' + priceParts[0].substring(i);
      }
    }
    return priceParts.join(',');
  }

  public get price(): number {
    return this._price;
  }

  public get date(): string {
    const date = new Date(this._date);
    // const dateStr = date.toLocaleDateString().split('.').map(datePart => datePart.trim().padStart(2, '0')).join ('.');
    // const timeStr = date.toLocaleTimeString();
    return date.toString();
  }

  public get dateMonth(): string {
    return this.date.split('.').slice(1).join('.');
  }

  public get dateYear(): string {
    const date = new Date(this._date);
    return `${date.getFullYear()}`
  }

  public static fromApiPrice(apiPrice: ApiPrice): Price {
    return new Price(apiPrice.price, apiPrice.date, apiPrice.coin_id);
  }

  public static fromApiPriceList(apiPrices: ApiPrice[]): Price[] {
    const prices: Price[] = []
    for (const apiPrice of apiPrices) {
      prices.push(Price.fromApiPrice(apiPrice));
    }
    return prices;
  }
}
