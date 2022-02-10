import {Types} from "mongoose";

import Purchase, {PurchaseDocument} from "../models/purchase.model";
import {InvalidParameterError} from "../errors/invalid-par.error";
import {NotFoundError} from "../errors/not-found.error";

export class PurchaseService {
    private static _instance: PurchaseService | null = null;
    private constructor() {}

    public static get get(): PurchaseService {
        if (!PurchaseService._instance) {
            PurchaseService._instance = new PurchaseService();
        }
        return PurchaseService._instance;
    }

    public async createPurchase(coinId: string, price: number): Promise<PurchaseDocument> {
        if (!Types.ObjectId.isValid(coinId))
            throw new InvalidParameterError(`The passed id: ${coinId} is invalid`);
        if (await Purchase.findOne({coin_id: coinId}))
            throw new InvalidParameterError(`Coin with id ${coinId} was already bought`);

        return await Purchase.create({
            coin_id: coinId,
            price: price
        });
    }

    public async deletePurchase(coinId: string): Promise<void> {
        if (!Types.ObjectId.isValid(coinId))
            throw new InvalidParameterError(`The passed id: ${coinId} is invalid`);
        if (!(await Purchase.findOne({coin_id: coinId})))
            throw new NotFoundError(`Can't find purchase of coin with id: ${coinId}`);
        await Purchase.deleteOne({coin_id: coinId});
    }

    public async purchaseList(): Promise<PurchaseDocument[]> {
        return await Purchase.find();
    }

    public async purchaseByCoinId(coinId: string): Promise<PurchaseDocument> {
        if (!Types.ObjectId.isValid(coinId))
            throw new InvalidParameterError(`The passed id: ${coinId} is invalid`);
        const purchase = await Purchase.findOne({coin_id: coinId});
        if (!purchase)
            throw new NotFoundError(`Can't find purchase of coin with id: ${coinId}`);

        return purchase;
    }
}