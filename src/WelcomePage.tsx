import { useRef, useEffect, useState } from "react";
import './WelcomePage.css'
import StartView from "./StartView.tsx";
import GameBoardView from "./game-board/GameBoardView.tsx";
import type {Figure, FigureColor, PlayerFigure} from "./types.ts";

const PLAYER_COLOR: FigureColor = "green";
const OPPONENT_COLOR: FigureColor = "red";

const obtainOpponentFigure = (userFigure: PlayerFigure): PlayerFigure => {
    const opponentFigure = userFigure.figure === "circle" ? "cross" : "circle";
    return {
        figure: opponentFigure,
        color: OPPONENT_COLOR
    }
}

const randomFigure = (): Figure => {
    const figures: Array<Figure> = ["circle", "cross"];
    const index = Math.floor(Math.random() * figures.length);
    return figures[index];
}

const WelcomePage = () => {
    const userFigure: PlayerFigure = { figure: randomFigure(), color: PLAYER_COLOR };
    const opponentFigure: PlayerFigure = obtainOpponentFigure(userFigure);
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
                ? <GameBoardView userFigure={userFigure} opponentFigure={opponentFigure} />
                : <StartView onStartButtonClick={startGame} />
            }

        </div>
    )
}

export default WelcomePage
