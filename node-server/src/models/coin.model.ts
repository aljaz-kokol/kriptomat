import { Schema, Document, model } from 'mongoose'

export interface CoinDocument extends Document {
    name: string;
    connection: string;
    image: string;
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
    }
});

const Coin = model<CoinDocument>('Coin', coinSchema);

export default Coin
