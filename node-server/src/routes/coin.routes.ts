import { Router } from 'express'

import {getCoinById, getCoinPrices, getCoins, postBuyCoin, postSellCoin} from '../controllers/coins.controller'

const router = Router()

router.get('/', getCoins); // Return list of coins

router.get('/:id', getCoinById); // Return coin data based on the passed id
router.post('/:id', postBuyCoin); // Buy coin
router.delete('/:id', postSellCoin); // Sell coin

router.get('/:id/prices', getCoinPrices); // Return list of prices for coin

export default router;
