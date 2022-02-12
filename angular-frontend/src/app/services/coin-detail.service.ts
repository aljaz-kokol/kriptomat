import {Injectable} from "@angular/core";
import {Coin} from "../models/coin.model";
import {Price} from "../models/price.model";
import {Observable, Subject} from "rxjs";
import {CoinService} from "./coin.service";
import {PriceService} from "./price.service";
import {PurchaseService} from "./purchase.service";

@Injectable()
export class CoinDetailService {
  constructor(private _coinService: CoinService,
              private _priceService: PriceService,
              private _purchaseService: PurchaseService) {}

  private _coinChange = new Subject<Coin>()
  private _activeCoin: Coin | null = null;
  private _addedCoins: Coin[] = [];
  private _addedGraphCoins: Coin[] = [];

  private _prices: Price[] = [];
  private _bitCoinPrices: Price[] = [];
  private _selectedToggleOptions: string[] = [];
  private _percentChartToggleOptions = new Map<string, number>([
    ['current', 0],
    ['2h', 1],
    ['4h', 2],
    ['12h', 6],
    ['1 day', 12],
    ['2 days', 24],
    ['3 days', 36],
    ['4 days', 48],
    ['5 days', 60],
    ['6 days', 72],
    ['1 week', 84],
    ['2 weeks', 168],
    ['3 weeks', 252],
    ['4 weeks', 336],
  ]);

  bought: boolean | null = false;
  fetchingData: boolean = true;

  buyCoin() {
    if (this._activeCoin && this.bought === false) {
      this.bought = null;
      this._coinService.buyCoin(this._activeCoin.id).subscribe(res => {
        this._purchaseService.addPurchase(res.purchase);
        this.bought = true;
      });
    }
  }

  sellCoin() {
    if (this._activeCoin && this.bought === true) {
      this.bought = null;
      this._coinService.sellCoin(this._activeCoin.id).subscribe(() => {
        this._purchaseService.removePurchase(this._activeCoin!.id);
        this.bought = false;
      });
    }
  }

  addCoins(coins: Coin[]): void {
    this._addedCoins.push(...coins);
  }

  removeCoin(removeCoin: Coin): void {
    const index = this._addedCoins.findIndex(coin => coin.name == removeCoin.name);
    if (index >= 0)
      this._addedCoins.splice(index, 1);
  }

  toggleGraphCoin(coin: Coin): void {
    const index = this._addedGraphCoins.findIndex(graphCoin => graphCoin.name == coin.name);
    if (index >= 0) {
      this._addedGraphCoins.splice(index, 1);
      if (this._activeCoin)
        this._coinChange.next(this._activeCoin);
    } else {
      const prices = this._priceService.getCoinPrices(coin.id);
      if (prices.length <= 0) {
        this._priceService.fetchCoinPrices(coin.id)
          .subscribe(prices => {
            this._addedGraphCoins.push(coin);
            if (this._activeCoin) {
              this._coinChange.next(this._activeCoin);
            }
          });
      } else {
        this._addedGraphCoins.push(coin);
        if (this._activeCoin)
          this._coinChange.next(this._activeCoin);
      }
    }
  }

  // == SETTERS ==
  setCoin(coinId: string) {
    this.fetchingData = true;
    this._coinService.getCoinById(coinId).subscribe(coin => {
      this._setupAddedCoinsOnSwitch(coin);
      this._activeCoin = coin;
      this._coinChange.next(this._activeCoin);
      this.bought = this._purchaseService.coinIsBought(this._activeCoin.id);

      this._prices = this._priceService.getCoinPrices(coin.id);
      this._bitCoinPrices = this._priceService.getCoinPrices('61f6a692e9b8e64c7e87db2e');
      if (this._prices.length > 0)
        this.fetchingData = false;
      this._priceService.fetchCoinPrices(coin.id).subscribe(prices => {
        this._prices = prices;
        if (this._bitCoinPrices.length > 0)
          this.fetchingData = false;
        this._priceService.fetchCoinPrices('61f6a692e9b8e64c7e87db2e').subscribe(prices => {
          this._bitCoinPrices = prices;
          if (this._activeCoin)
            this.fetchingData = false;
        });
      });
    })
  }

  setToggleItems(items: string[]) {
    this._selectedToggleOptions = items;
  }

  // == GETTERS ==
  get prices(): number[] {
    return this._prices.map(price => price.price);
  }

  get pricePercentagesChartDataset(): {data: number[], name: string}[] {
    if (this._selectedToggleOptions.length <= 0)
      this._selectedToggleOptions.push(this.percentChartToggleOptions[0])
    const lastIndex = this._prices.length - 1;
    if (lastIndex < 0) return [];

    const percentages = this.pricePercentages;
    const values: {data: number[], name: string}[] = [];

    if (this._selectedToggleOptions.length > 0) {
      for (const option of this._selectedToggleOptions) {
        if (option === 'bitcoin') {
          values.push({data: this.bitcoinPricePercentages, name: 'Bitcoin'});
        } else {
          const diff = this._percentChartToggleOptions.get(option) ?? 0;
          const data: number[] = [];
          percentages.forEach((percent: number, index: number) => {
            if (index + diff < percentages.length && diff !== 0)
              data.push(percent - percentages[index + diff]);
            else if (diff == 0) {
              data.push(percent);
            }
          });
          values.push({data: data, name: `${this._activeCoin?.name} ${option}`});
        }
      }
    } else {
      values.push({data: percentages, name: this._selectedToggleOptions[0]})
    }

    for (const graphCoin of this._addedGraphCoins) {
      if (graphCoin.name != this._activeCoin?.name) {
        const prices = this._priceService.getCoinPrices(graphCoin.id);
        values.push({data: CoinDetailService._pricesPercentages(prices), name: graphCoin.name});
      }
    }

    return values;
  }

  get pricePercentages(): number[] {
    return CoinDetailService._pricesPercentages(this._prices);
  }

  get percentChartToggleOptions(): string[] {
    return Array.from(this._percentChartToggleOptions.keys());
  }

  get selectedPercentChartOptions(): string[] {
    return [...this._selectedToggleOptions];
  }

  get addedGraphCoins(): Coin[] {
    return [...this._addedGraphCoins];
  }

  get bitcoinPricePercentages(): number[] {
    return CoinDetailService._pricesPercentages(this._bitCoinPrices);
  }

  get addedCoins(): Coin[] {
    if (this._activeCoin)
      return [...this._addedCoins, this._activeCoin];
    return []
  }

  get dates(): string[] {
    return this._prices.map(price => price.date);
  }

  get coinChangeListener(): Observable<Coin> {
    return this._coinChange.asObservable();
  }

  // == PRIVATE ==
  private _setupAddedCoinsOnSwitch(newActiveCoin: Coin) {
    if (this._activeCoin)
      this._addedCoins.push(this._activeCoin)
    const index = this._addedCoins.findIndex(coin => coin.name == newActiveCoin.name);
    const graphIndex = this._addedGraphCoins.findIndex(coin => coin.name == newActiveCoin.name);

    if (index >= 0)
      this._addedCoins.splice(index, 1);

  }

  private static _pricesPercentages(prices: Price[]) {
    const lastIndex = prices.length - 1;
    if (lastIndex < 0) return [];
    return prices.map(price => (price.price * 100 / prices[lastIndex].price) - 100);
  }
}