import { Router } from 'express';
import {getCoinByName, getCoins, getDates} from "../controllers/coin.controller";

const router = Router();
router.get('/', getCoins);
router.get('/dates', getDates);
router.get('/:name', getCoinByName);

export default router;
