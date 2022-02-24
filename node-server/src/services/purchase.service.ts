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

    public async updatePurchaseDiffLimit(purchaseId: string, limit: { maxDiff?: number; ogDiff?: number; }) {
        const purchase = await this.purchaseById(purchaseId);
        
        if (!limit.maxDiff && !limit.ogDiff)
            throw new InvalidParameterError('Warning limit for max. or original diff in % must be set');
        if (limit.maxDiff && limit.maxDiff > 0)
            throw new InvalidParameterError('Warning limit for max. diff. in % can only be negative');
        if (limit.ogDiff && limit.ogDiff > 0)
            throw new InvalidParameterError('Warning limit for original diff. in % can only be negative');
        
        purchase.originalDiffLimit = limit.maxDiff ?? purchase.originalDiffLimit;
        purchase.maxDiffLimit = limit.maxDiff ?? purchase.maxDiffLimit;

        await purchase.save();
    }

    public async deletePurchase(coinId: string): Promise<void> {
        if (!Types.ObjectId.isValid(coinId))
            throw new InvalidParameterError(`The passed id: ${coinId} is invalid`);
        if (!(await Purchase.findOne({coin_id: coinId})))
            throw new NotFoundError(`Can't find purchase of coin with id: ${coinId}`);
        await Purchase.deleteOne({coin_id: coinId});
    }

    public async purchaseList(): Promise<PurchaseDocument[]> {
        return await Purchase.find().populate({
            path: 'coin_id'
        });
    }

    public async purchaseByCoinId(coinId: string): Promise<PurchaseDocument> {
        if (!Types.ObjectId.isValid(coinId))
            throw new InvalidParameterError(`The passed id: ${coinId} is invalid`);
        const purchase = await Purchase.findOne({coin_id: coinId});
        if (!purchase)
            throw new NotFoundError(`Can't find purchase of coin with id: ${coinId}`);

        return purchase;
    }

    public async purchaseById(purchaseId: string): Promise<PurchaseDocument {
        if (!Types.ObjectId.isValid(purchaseId))
            throw new InvalidParameterError(`The passed id: ${purchaseId} is invalid`);
        const purchase = await Purchase.findById(purchaseId);
        if (!purchase)
            throw new NotFoundError(`Can't find purchase with id: ${purchaseId}`);
        return purchase;
    }
}
