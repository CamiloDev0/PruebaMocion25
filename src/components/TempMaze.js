import React, { useState, useEffect } from 'react';

function TempMaze() {
    const [players, setPlayers] = useState([
        { id: 1, x: 50, y: 50, score: 0 },
        { id: 2, x: 200, y: 100, score: 0 },
    ]);
    const [coins, setCoins] = useState([]);
    const [obstacles] = useState([
        { id: 1, x: 100, y: 100, width: 100, height: 20 },
        { id: 2, x: 300, y: 200, width: 20, height: 150 },
        { id: 3, x: 400, y: 50, width: 150, height: 20 },
    ]);
    const [timeLeft, setTimeLeft] = useState(60);
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [gamesPlayed, setGamesPlayed] = useState(0);

    const mazeStyle = {
        position: 'relative',
        width: '600px',
        height: '400px',
        border: '2px solid black',
        backgroundColor: '#f0f0f0',
        margin: '0 auto',
        overflow: 'hidden',
    };

    const scoreTableStyle = {
        position: 'absolute',
        left: '-120px',
        top: '20px',
        textAlign: 'left',
        backgroundColor: '#ffffff',
        padding: '10px',
        border: '1px solid #000',
    };

    const rankingTableStyle = {
        position: 'absolute',
        right: '-90px',
        top: '20px',
        textAlign: 'left',
        backgroundColor: '#ffffff',
        padding: '10px',
        border: '1px solid #000',
    };

    const movePlayer = (playerId, direction) => {
        if (!gameStarted || gameOver) return;
        setPlayers((prevPlayers) =>
            prevPlayers.map((player) => {
                if (player.id === playerId) {
                    let newX = player.x;
                    let newY = player.y;
                    if (direction === 'up') newY -= 10;
                    if (direction === 'down') newY += 10;
                    if (direction === 'left') newX -= 10;
                    if (direction === 'right') newX += 10;

                    const collision = obstacles.some(
                        (obstacle) =>
                            newX < obstacle.x + obstacle.width &&
                            newX + 20 > obstacle.x &&
                            newY < obstacle.y + obstacle.height &&
                            newY + 20 > obstacle.y
                    );
                    if (!collision) {
                        const collectedCoins = coins.filter(
                            (coin) =>
                                Math.abs(coin.x - newX) < 15 &&
                                Math.abs(coin.y - newY) < 15
                        );
                        if (collectedCoins.length > 0) {
                            setCoins((prevCoins) =>
                                prevCoins.filter((coin) => !collectedCoins.includes(coin))
                            );
                            player.score += collectedCoins.length * 5;
                        }
                        return { ...player, x: newX, y: newY };
                    }
                }
                return player;
            })
        );
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            switch (event.key) {
                case 'ArrowUp':
                    movePlayer(1, 'up');
                    break;
                case 'ArrowDown':
                    movePlayer(1, 'down');
                    break;
                case 'ArrowLeft':
                    movePlayer(1, 'left');
                    break;
                case 'ArrowRight':
                    movePlayer(1, 'right');
                    break;
                case 'w':
                    movePlayer(2, 'up');
                    break;
                case 's':
                    movePlayer(2, 'down');
                    break;
                case 'a':
                    movePlayer(2, 'left');
                    break;
                case 'd':
                    movePlayer(2, 'right');
                    break;
                default:
                    break;
            }
        };

        if (gameStarted && !gameOver) {
            window.addEventListener('keydown', handleKeyDown);
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [coins, gameStarted, gameOver]);

    useEffect(() => {
        if (gameStarted && timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0) {
            setGameOver(true);
            setGamesPlayed((prev) => prev + 1);
        }
    }, [timeLeft, gameStarted]);

    useEffect(() => {
        if (gameStarted && !gameOver) {
            const interval = setInterval(() => {
                const newCoin = {
                    id: Math.random(),
                    x: Math.floor(Math.random() * 580),
                    y: Math.floor(Math.random() * 380),
                };
                setCoins((prevCoins) => [...prevCoins, newCoin]);
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [gameOver, gameStarted]);

    const startGame = () => {
        setGameStarted(true);
        setGameOver(false);
        setTimeLeft(60);
        setCoins([]);
        setPlayers((prev) =>
            prev.map((player) => ({ ...player, x: 50, y: 50, score: 0 }))
        );
    };

    return (
        <div style={{ position: 'relative', height: '100vh' }}>
            <div style={scoreTableStyle}>
                <h3>Puntajes</h3>
                <p>Jugador 1: {players.find((p) => p.id === 1).score} puntos</p>
                <p>Jugador 2: {players.find((p) => p.id === 2).score} puntos</p>
                <p>Puntaje General: {players.reduce((acc, p) => acc + p.score, 0)} puntos</p>
            </div>
            <div style={rankingTableStyle}>
                <h3>Clasificación</h3>
                <p>Partidas Jugadas: {gamesPlayed}</p>
            </div>
            <div style={{ textAlign: 'center', marginTop: '10px' }}>
                <h1>{gameOver ? 'Fin del Juego' : `Tiempo restante: ${timeLeft}s`}</h1>
            </div>
            <div style={mazeStyle}>
                {players.map((player) => (
                    <div
                        key={player.id}
                        style={{
                            position: 'absolute',
                            top: player.y,
                            left: player.x,
                            width: '20px',
                            height: '20px',
                            backgroundColor: 'blue',
                        }}
                    ></div>
                ))}
                {coins.map((coin) => (
                    <div
                        key={coin.id}
                        style={{
                            position: 'absolute',
                            top: coin.y,
                            left: coin.x,
                            width: '10px',
                            height: '10px',
                            backgroundColor: 'gold',
                            borderRadius: '50%',
                        }}
                    ></div>
                ))}
                {obstacles.map((obstacle) => (
                    <div
                        key={obstacle.id}
                        style={{
                            position: 'absolute',
                            top: obstacle.y,
                            left: obstacle.x,
                            width: `${obstacle.width}px`,
                            height: `${obstacle.height}px`,
                            backgroundColor: 'gray',
                        }}
                    ></div>
                ))}
            </div>
            {!gameStarted && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                    <button onClick={startGame} style={{ padding: '10px 20px', fontSize: '16px' }}>
                        INICIAR
                    </button>
                </div>
            )}
        </div>
    );
}

export default TempMaze;
