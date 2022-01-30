import { Router } from 'express'

import { getCoins } from '../controllers/coins.controller'

const router = Router()

router.get('/', getCoins); // Return list of coins

export default router;
