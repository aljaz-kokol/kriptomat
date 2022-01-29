import express, {Request, Response, NextFunction} from 'express';

import coinRoutes from "./routes/coin.routes";

const app = express();

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/api/coins', coinRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.log(err);
   res.status(500).json({
        message: err.message,
   })
});

export default app;
