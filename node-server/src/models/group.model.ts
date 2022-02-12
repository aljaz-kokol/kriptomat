import  { Schema, Document, model, Types } from 'mongoose';

export interface GroupDocument extends Document {
    _id: string;
    name: string;
    coins: string[];
}

const groupSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    coins: [{
        type: Types.ObjectId,
        ref: 'Coin',
    }]
});

const Group = model<GroupDocument>('Group', groupSchema);

export default Group;
