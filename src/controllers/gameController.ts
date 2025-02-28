// import { Socket } from 'socket.io';
// import { Room, Player } from '../models/Room';

// const rooms: { [key: string]: Room } = {}; // Store rooms by room ID

// export const handleSocketConnection = (socket: Socket, io: any) => {
//     console.log('A user connected:', socket.id);

//     socket.on('joinRoom', (nickname: string, roomId: string) => {
//         if (!rooms[roomId]) {
//             rooms[roomId] = { players: [], deck: [] }; // Create a new room if it doesn't exist
//         }

//         const player: Player = { id: socket.id, nickname };
//         rooms[roomId].players.push(player);
//         socket.join(roomId); // Join the room
//         console.log(`${nickname} joined room ${roomId}`);

//         // Notify other players in the room
//         socket.to(roomId).emit('playerJoined', player);
//     });

//     // Handle player actions
//     socket.on('playerAction', (roomId: string, action: string) => {
//         console.log('Player action:', action);
//         socket.to(roomId).emit('playerAction', { id: socket.id, action });
//     });

//     // Handle disconnection
//     socket.on('disconnect', () => {
//         console.log('User disconnected:', socket.id);
//         for (const roomId in rooms) {
//             rooms[roomId].players = rooms[roomId].players.filter(player => player.id !== socket.id);
//             socket.to(roomId).emit('playerLeft', socket.id);
//         }
//     });
// };