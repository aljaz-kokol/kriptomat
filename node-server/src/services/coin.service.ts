import { Types } from 'mongoose'

import Coin, { CoinDocument } from '../models/coin.model'
import { InvalidParameterError } from "../errors/invalid-par.error"
import { NotFoundError } from "../errors/not-found.error"

export class CoinService {
    private static _instance: CoinService | null =  null;
    private constructor() {}

    public static get get(): CoinService {
        if (!this._instance) {
            this._instance = new CoinService();
        }
        return this._instance;
    }

    public async coinList(): Promise<CoinDocument[]> {
        return await Coin.find();
    }

    public async coinById(id: string): Promise<CoinDocument> {
        if (!Types.ObjectId.isValid(id))
            throw new InvalidParameterError(`ID: '${id}' is invalid`);

        const coin = await Coin.findById(id);

        if (!coin)
            throw new NotFoundError(`Coin with ID: '${id}' does not exist`)

        return coin;
    }
}
