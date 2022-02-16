import { Schema, model, Document, Types } from 'mongoose';

export interface UserDocument extends Document {
    _id: string;
    username: string;
    email: string;
    password: string;
}

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = model<UserDocument>('User', userSchema);

export default User;
