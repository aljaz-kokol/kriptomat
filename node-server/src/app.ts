import express, {Request, Response, NextFunction} from 'express';
import {DataService} from "./services/data.service";

const app = express();
import coinRoutes from "./routes/coin.routes";

app.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT, PATCH, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

app.use('/api/coins', coinRoutes);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
   res.status(500).json({
        message: err.message,
   })
});

export default app;
