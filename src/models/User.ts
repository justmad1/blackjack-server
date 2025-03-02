import mongoose, { Document, Schema } from 'mongoose';

interface IUser extends Document {
    username: string;
    password: string;
    status: 'admin' | 'user';
}

const userSchema = new Schema<IUser>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;