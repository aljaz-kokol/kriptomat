import { Request, Response, NextFunction } from 'express'
import { CoinService } from '../services/coin.service'
import { StatusCode } from '../utils/status.util'
import {PriceService} from "../services/price.service"
import {PurchaseService} from "../services/purchase.service";

export const getCoins = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const coins = await CoinService.get.coinList();
        res.status(StatusCode.OK).json(coins)
    } catch(err) {
        next(err);
    }
}

export const getCoinById = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const coin = await CoinService.get.coinById(req.params.id);
        res.status(StatusCode.OK).json(coin)
    } catch(err) {
        next(err);
    }
}

export const getCoinPrices = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const coin = await CoinService.get.coinById(req.params.id);
        const prices = await PriceService.get.coinPriceList(coin);
        res.status(StatusCode.OK).json(prices);
    } catch (err) {
        next(err);
    }
}

export const postBuyCoin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const coin = await CoinService.get.coinById(req.params.id);
        const purchase = await PurchaseService.get.createPurchase(coin._id, coin.lastPrice);
        const coinPurchase = {
            coin: coin,
            boughtPrice: purchase.price,
            date: purchase.date,
            prices: []
        };
        res.status(StatusCode.CREATED).json({
            purchase: coinPurchase,
            message: `Coin ${coin.name} successfully purchased`
        })
    } catch (err) {
        next(err);
    }
}

export const postSellCoin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const coin = await CoinService.get.coinById(req.params.id);
        await PurchaseService.get.deletePurchase(coin._id);
        res.status(StatusCode.NO_CONTENT).json({});
    } catch (err) {
        next(err);
    }
}
