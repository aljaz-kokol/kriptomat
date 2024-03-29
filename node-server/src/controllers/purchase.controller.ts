import { Request, Response, NextFunction } from 'express';
import {PurchaseService} from "../services/purchase.service";
import {StatusCode} from "../utils/status.util";
import {PriceService} from "../services/price.service";
import {CoinDocument} from "../models/coin.model";

export const getPurchases = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const purchases = await PurchaseService.get.purchaseList();
        const purchasedCoins = [];
        for (const purchase of purchases) {
            purchasedCoins.push({
                _id: purchase._id,
                coin: purchase.coin_id,
                boughtPrice: purchase.price,
                date: purchase.date,
                maxDiffLimit: purchase.maxDiffLimit,
                originalDiffLimit: purchase.originalDiffLimit,
                prices: await PriceService.get.coinPriceFromDate((purchase.coin_id as unknown as CoinDocument), purchase.date)
            });
        }
        res.status(StatusCode.OK).json(purchasedCoins);
    } catch (err) {
        next(err);
    }
}

export const getPurchaseByCoinId = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const purchase = await PurchaseService.get.purchaseByCoinId(req.params.coinId);
        res.status(StatusCode.OK).json(purchase);
    } catch (err) {
        next(err);
    }
}

export const patchUpdatePurchase = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const updatedPurchase = await PurchaseService.get.updatePurchaseDiffLimit(req.params.purchaseId, {
            maxDiff: req.body.maxDiff,
            ogDiff: req.body.ogDiff
        });
        res.status(StatusCode.OK).json({
            message: 'Purchase successfully updated',
            purchase: updatedPurchase
        });
    } catch (err) {
        next(err);
    }
}
