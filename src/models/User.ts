import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    username: string;
    moneyBalance: number;
}

const userSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    moneyBalance: { type: Number, default: 1000 }
});

export default mongoose.model<IUser>('User', userSchema);