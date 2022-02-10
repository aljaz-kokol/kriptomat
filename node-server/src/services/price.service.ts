import Price, {PriceDocument} from "../models/price.model";
import {CoinDocument} from "../models/coin.model";

export class PriceService {
    private static _instance: PriceService | null = null;
    private constructor() {}

    public static get get(): PriceService {
        if (!this._instance) {
            this._instance = new PriceService();
        }
        return this._instance;
    }

    public async priceList(): Promise<PriceDocument[]> {
        return await Price.find().sort({date: -1}).lean();
    }

    public async coinPriceList(coin: CoinDocument): Promise<PriceDocument[]> {
        return await Price.find({coin_id: coin._id}).sort({date: -1}).lean();
    }

    public async coinPriceFromDate(coin: CoinDocument, date: Date): Promise<PriceDocument[]> {
        return await Price.find({coin_id: coin._id, date: {$gte: date}}).sort({date: -1}).lean();
    }
}
