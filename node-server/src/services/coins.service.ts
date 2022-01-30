import Coin, {CoinDocument} from '../models/coin.model'

export class CoinsService {
    private static _instance: CoinsService | null =  null;
    private constructor() {}

    public static get get(): CoinsService {
        if (!this._instance) {
            this._instance = new CoinsService();
        }
        return this._instance;
    }

    public async coinList(): Promise<CoinDocument[]> {
        return await Coin.find();
    }
}
