import { useRef, useEffect, useState } from "react";
import './WelcomePage.css'
import StartView from "./StartView.tsx";
import GameBoardView from "./game-board/GameBoardView.tsx";

function WelcomePage() {
    const backgroundMusic = useRef<HTMLAudioElement | null>(null);
    const [gameStarted, setGameStarted] = useState(false);

    useEffect(() => {
        backgroundMusic.current = new Audio("/mozart.ogg");
        backgroundMusic.current.loop = true;
        backgroundMusic.current.volume = 0.3;

        return () => {
            backgroundMusic.current?.pause();
            backgroundMusic.current = null;
        };
    }, []);

    const startGame = () => {
        if (backgroundMusic.current) {
            backgroundMusic.current.play();
        }
        setGameStarted(true);
    }

    return (
        <div className="game-container">
            {gameStarted
                ? <GameBoardView />
                : <StartView onStartButtonClick={startGame} />
            }

        </div>
    )
}

export default WelcomePage
