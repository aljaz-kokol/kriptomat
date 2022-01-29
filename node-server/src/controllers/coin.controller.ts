import { Request, Response, NextFunction } from "express";
import {DataService} from "../services/data.service";

export const getCoins = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({
            names: DataService.get.coins.map(coin => coin.name)
        })
    } catch(err) {
        next(err);
    }
}

export const getCoinByName = (req: Request, res: Response, next: NextFunction) => {
    try {
        const coin = DataService.get.getCoinByName(req.params.name);
        res.status(200).json({
            name: coin.name,
            prices: coin.price,
            dates: DataService.get.dates,
        })
    } catch(err) {
        next(err);
    }
}

export const getDates = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({
            dates: DataService.get.dates
        })
    } catch(err) {
        next(err);
    }
}

export const postBuyCoin = (req: Request, res: Response, next: NextFunction) => {
    try {
        DataService.get.buyCoin(req.body.name);
        res.status(201).json({
            message: 'Coin successfully bought'
        })
    } catch(err) {
        next(err);
    }
}

export const getBoughtCoins = (req: Request, res: Response, next: NextFunction) => {
    try {
        res.status(200).json({
            names: DataService.get.boughtCoins
        })
    } catch(err) {
        next(err);
    }
}

export const getBoughtCoinByName = (req: Request, res: Response, next: NextFunction) => {
    try {
        const coin = DataService.get.getBoughtCoinByName(req.params.name);
        res.status(200).json(coin)
    } catch(err) {
        next(err);
    }
}
