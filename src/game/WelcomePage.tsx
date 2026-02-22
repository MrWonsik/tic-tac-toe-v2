import { useRef, useEffect, useState } from "react";
import './WelcomePage.css'
import StartView from "./StartView.tsx";
import GameBoardView from "./game-board/GameBoardView.tsx";
import {useBackgroundMusic} from "./useBackgroundMusic.ts";

const WelcomePage = () => {
    const { pauseMusic, restartMusic, toggleMusic, musicStatus } = useBackgroundMusic("/mozart.ogg", 0.3);
    const [gameStarted, setGameStarted] = useState(false);

    const startGame = () => {
        restartMusic();
        setGameStarted(true);
    }

    const backToMainMenu = () => {
        pauseMusic();
        setGameStarted(false);
    }

    return (
        <div className="game-container">
            {gameStarted
                ? <GameBoardView onReturn={backToMainMenu} toggleMusic={toggleMusic} musicStatus={musicStatus} />
                : <StartView onStartButtonClick={startGame} />
            }

        </div>
    )
}

export default WelcomePage
