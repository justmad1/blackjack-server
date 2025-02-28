import mongoose, { Document, Schema } from 'mongoose';

interface IRoom extends Document {
	roomId: string;
	players: mongoose.Types.Array<Schema.Types.ObjectId>;
	betAmount: number;
	gameState: string;
}

const roomSchema: Schema = new Schema({
	roomId: { type: String, required: true, unique: true },
	players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
	betAmount: { type: Number, required: true },
	gameState: { type: String, default: 'waiting' },
});

export default mongoose.model<IRoom>('Room', roomSchema);