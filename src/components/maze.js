import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000'); // Conexión al backend

function Maze() {
    const [players, setPlayers] = useState([]);
    const [coins, setCoins] = useState([]);

    // Escucha eventos del servidor
    useEffect(() => {
        socket.on('update-position', (data) => {
            setPlayers((prev) => [...prev.filter(p => p.id !== data.id), data]);
        });

        socket.on('coin-collected', (coinId) => {
            setCoins((prev) => prev.filter(c => c.id !== coinId));
        });

        return () => socket.disconnect();
    }, []);

    const handleMove = (direction) => {
        socket.emit('move', { id: socket.id, direction });
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            {players.map((player) => (
                <div key={player.id} style={{
                    position: 'absolute',
                    top: player.y,
                    left: player.x,
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'blue'
                }}></div>
            ))}
            {coins.map((coin) => (
                <div key={coin.id} style={{
                    position: 'absolute',
                    top: coin.y,
                    left: coin.x,
                    width: '10px',
                    height: '10px',
                    backgroundColor: 'gold'
                }}></div>
            ))}
            <button onClick={() => handleMove('up')}>Up</button>
            <button onClick={() => handleMove('down')}>Down</button>
            <button onClick={() => handleMove('left')}>Left</button>
            <button onClick={() => handleMove('right')}>Right</button>
        </div>
    );
}

export default Maze;
