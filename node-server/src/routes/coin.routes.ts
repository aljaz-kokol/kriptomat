import { Router } from 'express';
import {
    getBoughtCoinByName,
    getBoughtCoins,
    getCoinByName,
    getCoins,
    getDates,
    postBuyCoin
} from "../controllers/coin.controller";

const router = Router();
router.get('/', getCoins);
router.get('/dates', getDates);
router.get('/:name', getCoinByName);
router.get('/bought/list', getBoughtCoins);
router.get('/bought/:name', getBoughtCoinByName);

router.post('/', postBuyCoin);

export default router;
