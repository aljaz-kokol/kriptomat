import { Request, Response, NextFunction } from 'express'
import { CoinsService } from '../services/coins.service';
import { StatusCode } from '../utils/status.util';

export const getCoins = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const coins = await CoinsService.get.coinList();
        res.status(StatusCode.OK).json(coins)
    } catch(err) {
        next(err);
    }
}
