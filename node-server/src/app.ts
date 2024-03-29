import path from 'path';

import express, { Request, Response, NextFunction } from 'express';
import { APIError } from './errors/api.error';
import {COIN_ENDPOINT, GROUP_ENDPOINT, PRICE_ENDPOINT, PURCHASE_ENDPOINT} from './utils/endpoints.util';
import coinsRoutes from './routes/coin.routes';
import priceRoutes from './routes/price.routes';
import purchaseRoutes from './routes/purchase.routes';
import groupRoutes from './routes/group.routes';

const app = express();

app.use(express.json());
app.use('/api/images',express.static(path.join('files', 'images')))

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use(COIN_ENDPOINT, coinsRoutes);
app.use(PRICE_ENDPOINT, priceRoutes);
app.use(PURCHASE_ENDPOINT, purchaseRoutes);
app.use(GROUP_ENDPOINT, groupRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof APIError) {
        res.status(err.statusCode).json(err)
    } else {
        const error = APIError.fromError(err)
        res.status(error.statusCode).json(err)
    }
});

export default app;
