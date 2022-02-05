import { Request, Response, NextFunction } from 'express';
import {PriceService} from "../services/price.service";
import {StatusCode} from "../utils/status.util";

export const getPrices = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const prices = await PriceService.get.priceList();
        res.status(StatusCode.OK).json(prices);
    } catch (err) {
        next(err);
    }
}
