import { Request, Response } from 'express';
import User from '../models/User';

const createUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { username } = req.body;
		const newUser = new User({ username });
		await newUser.save();
		res.status(201).json({ message: 'User created', user: newUser });
	} catch (err) {
		res.status(400).json({ message: 'Error creating user', error: err });
	}
};

const getUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const { username } = req.params;
		const user = await User.findOne({ username });
		if (!user) {
			res.status(404).json({ message: 'User not found' });
			return;
		}
		res.status(200).json(user);
	} catch (err) {
		res.status(400).json({ message: 'Error fetching user', error: err });
	}
};

export { createUser, getUser };