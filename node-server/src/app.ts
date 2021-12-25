import express from 'express';
import {DataService} from "./services/data.service";

const app = express();

app.use('/test', async (req, res, next) => {
    const csvData = await DataService.get.getData();
    const row1 = csvData[2].price[0];
    console.log(row1);
    res.status(200).json({
        message: 'Finished'
    })
})

export default app;
