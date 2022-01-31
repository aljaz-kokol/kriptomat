export interface ApiPrice {
  _id: string;
  price: number;
  date: Date;
  coin_id: string;
}

export class Price {
  constructor(public price: number,
              public date: Date,
              public coin: string) {}

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
