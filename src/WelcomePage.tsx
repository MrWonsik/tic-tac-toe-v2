import { useRef, useEffect, useState } from "react";
import './WelcomePage.css'
import StartView from "./StartView.tsx";
import GameBoardView from "./game-board/GameBoardView.tsx";

function WelcomePage() {
    const backgroundMusic = useRef<HTMLAudioElement | null>(null);
    const [musicPlaying, setMusicPlaying] = useState(true);
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

    useEffect(() => {
        if (!backgroundMusic.current) return;

        if (musicPlaying) {
            backgroundMusic.current.play();
        } else {
            backgroundMusic.current.pause();
            backgroundMusic.current.currentTime = 0;
        }
    }, [musicPlaying]);

    const startGame = () => {
        setMusicPlaying(true);
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
