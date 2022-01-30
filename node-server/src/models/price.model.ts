import { Schema, model, Document, Types } from 'mongoose'

export interface PriceDocument extends Document {
    _id: string;
    price: number,
    date: Date,
    coin_id: string
}

const priceSchema = new Schema({
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    coin_id: {
        type: Types.ObjectId,
        ref: 'Coin',
        required: true
    }
});

const Price = model<PriceDocument>('Price', priceSchema);

export default Price;
