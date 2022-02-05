import { Router } from 'express'

import {getCoinById, getCoinPrices, getCoins} from '../controllers/coins.controller'

const router = Router()

router.get('/', getCoins); // Return list of coins
router.get('/:id', getCoinById); // Return coin data based on the passed id
router.get('/:id/prices', getCoinPrices); // Return list of prices for coin

export default router;
