import { Request, Response } from 'express';
import Room from '../models/Room';
import User from '../models/User';

const createRoom = async (req: Request, res: Response): Promise<void> => {
    try {
        const { betAmount } = req.body;
        const roomId = `room-${Math.floor(Math.random() * 1000)}`; // Temporary random ID (to improve later)
        const newRoom = new Room({ roomId, betAmount, players: [] });
        await newRoom.save();
        res.status(201).json({ message: 'Room created', room: newRoom });
    } catch (err) {
        res.status(400).json({ message: 'Error creating room', error: err });
    }
};

const joinRoom = async (req: Request, res: Response): Promise<void> => {
    try {
        const { roomId, userId } = req.body;
        const room = await Room.findOne({ roomId });
        if (!room) {
            res.status(404).json({ message: 'Room not found' });
            return;
        }

        const user = await User.findById(userId);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }

        if (room.players.length < 4) {
            room.players.push(user._id);
            await room.save();
            res.status(200).json({ message: 'User added to room', room });
        } else {
            res.status(400).json({ message: 'Room is full' });
        }
    } catch (err) {
        res.status(400).json({ message: 'Error joining room', error: err });
    }
};

const deleteRoom = async (req: Request, res: Response): Promise<void> => {
    try {
        const { roomId } = req.body;
        const result = await Room.findByIdAndDelete(roomId);

        if (result) {
            res.status(200).json({ message: 'Room deleted successfully' });
        } else {
            res.status(404).json({ message: 'Room not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while deleting the room' });
    }
}

export { createRoom, joinRoom, deleteRoom };