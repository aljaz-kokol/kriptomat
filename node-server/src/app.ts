import express from 'express';
import {DataService} from "./services/data.service";

const app = express();

app.use('/test', async (req, res, next) => {
    console.log(await DataService.get.getData());
})

export default app;
