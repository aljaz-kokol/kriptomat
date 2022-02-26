import { Router } from 'express';
import {getPurchaseByCoinId, getPurchases, patchUpdatePurchase} from "../controllers/purchase.controller";

const router = Router();

router.get('/', getPurchases); // Get list of purchases
router.get('/:coinId', getPurchaseByCoinId); // Get purchase document for specific coin
router.patch('/:purchaseId', patchUpdatePurchase);

export default router;
