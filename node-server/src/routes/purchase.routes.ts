import { Router } from 'express';
import {getPurchaseByCoinId, getPurchases} from "../controllers/purchase.controller";

const router = Router();

router.get('/', getPurchases); // Get list of purchases
router.get('/:coinId', getPurchaseByCoinId); // Get purchase document for specific coin

export default router;
