import {Coin} from "../models/coin.model";

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
}
