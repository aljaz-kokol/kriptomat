import  { Schema, Document, model, Types } from 'mongoose';

export interface GroupDocument extends Document {
    _id: string;
    name: string;
    note: string;
    coins: string[];
}

const groupSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    note: {
        type: String,
        default: ''
    },
    coins: [{
        type: Types.ObjectId,
        ref: 'Coin',
    }]
}, {
    timestamps: true
});

const Group = model<GroupDocument>('Group', groupSchema);

export default Group;
