import React from 'react';
import type {PlayerFigures, WinnerInformation} from "../../types.ts";
import "./GameInfoBox.css";

interface GameInfoBoxProps {
    gameEnd: boolean,
    winnerInfo: WinnerInformation | null,
    playerFigures: PlayerFigures,
    isUserTurn: boolean,
}

const GameInfoBox: React.FC<GameInfoBoxProps> = ({ gameEnd, winnerInfo, playerFigures, isUserTurn}) => {
    let text: string;

    if (gameEnd) {
        text = winnerInfo
            ? (winnerInfo.winningFigure === playerFigures.mainPlayer ? "You win" : "You lose")
            : "Draw";
    } else {
        text = "Your turn";
    }

    return (
        <div className="game-info-box">
            <span style={{ visibility: !gameEnd && !isUserTurn ? "hidden" : "visible" }}>
                {text}
            </span>
        </div>
    );
};

export default GameInfoBox;