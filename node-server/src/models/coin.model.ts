import { Schema, Document, model } from 'mongoose'

export interface CoinDocument extends Document {
    _id: string;
    name: string;
    connection: string;
    image: string;
    lastPrice: number;
}

const coinSchema = new Schema({
   name: {
       type: String,
       required: true
   },
    connection: {
       type: String,
       required: true
    },
    image: {
       type: String,
       required: true
    },
    lastPrice: {
       type: Number,
       required: true,
       default: 0
    }
});

const Coin = model<CoinDocument>('Coin', coinSchema);

export default Coin
