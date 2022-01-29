import fs from 'fs';
import path from 'path';

import {Coin} from "../models/coin.model";
import {BoughtCoin} from "../models/bought-coin.model";
const boughtCoins = require('../data/bought-coins.json')
const data = require('../data/web-data.json')



export class DataService {
    private static _instance: DataService;
    private static readonly _file: string = 'price-data21122021.csv';
    private constructor() {}

    public static get get(): DataService {
        if (!DataService._instance)
            DataService._instance = new DataService();
        return DataService._instance;
    }

    get  coins(): Coin[] {
        return Coin.fromJsonList(data['coins']);
    }

    getCoinByName(name: string): Coin {
        const coins = this.coins;
        let index = coins.findIndex(el => el.name.toLowerCase() === name.toLowerCase());
        if (index < 0) throw new Error('Coin with this name does not exist')
        return coins[index];
    }

    get dates() {
        return data['dates'];
    }

    buyCoin(name: string): void {
        const coins = this.coins;
        let index = coins.findIndex(el => el.name.toLowerCase() === name.toLowerCase());
        const boughtCoinsList = BoughtCoin.fromJsonList(boughtCoins);
        console.log(boughtCoinsList)
        let alreadyBought = boughtCoinsList.findIndex(el => el.name.toLowerCase() === name.toLowerCase());
        if (index < 0) throw new Error('Coin with this name does not exist');
        if (alreadyBought >= 0) throw new Error('Coin with this name was already bought');

        const coin = coins[index];
        boughtCoins.push(new BoughtCoin(coin.name, (100 * coin.price[0] / coin.price[coin.price.length - 1]) - 100, data['dates'][0]));
        fs.writeFileSync(path.join(__dirname, '..', 'data', 'bought-coins.json'), JSON.stringify(boughtCoins));
    }

    get boughtCoins(): BoughtCoin[] {
        return BoughtCoin.fromJsonList(boughtCoins);
    }

    getBoughtCoinByName(name: string): BoughtCoin {
        const coins = this.boughtCoins;
        let index = coins.findIndex(el => el.name.toLowerCase() === name.toLowerCase());
        if (index < 0) throw new Error('Coin with this name does not exist')
        return coins[index];
    }
}
