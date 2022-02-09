import { Schema, Types, Document, model } from 'mongoose';

export interface PurchaseDocument extends Document {
    _id: string;
    coin_id: string;
    price: number;
    date: Date;
}

const purchaseSchema = new Schema({
    coin_id: {
        type: Types.ObjectId,
        required: true,
        ref: 'Coin',
        unique: true
    },
    price: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    }
});

const Purchase = model<PurchaseDocument>('Purchase', purchaseSchema);
export default Purchase;
