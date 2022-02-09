import { Request, Response, NextFunction } from 'express';
import {PurchaseService} from "../services/purchase.service";
import {StatusCode} from "../utils/status.util";
import {CoinService} from "../services/coin.service";
import {PriceService} from "../services/price.service";

export const getPurchases = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const purchases = await PurchaseService.get.purchaseList();
        const purchasedCoins = [];
        for (const purchase of purchases) {
            const coin = await CoinService.get.coinById(purchase.coin_id);
            purchasedCoins.push({
                coin: coin,
                boughtPrice: purchase.price,
                date: purchase.date,
                prices: await PriceService.get.coinPriceFromDate(coin, purchase.date)
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
