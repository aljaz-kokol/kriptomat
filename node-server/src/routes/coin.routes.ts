import { Router } from 'express'

import {getCoinById, getCoins} from '../controllers/coins.controller'

const router = Router()

router.get('/', getCoins); // Return list of coins
router.get('/:id', getCoinById); // Return coin data based on the passed id

export default router;
