import { Request, Response, NextFunction } from 'express'
import { CoinService } from '../services/coin.service';
import { StatusCode } from '../utils/status.util';
import {PriceService} from "../services/price.service";

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
