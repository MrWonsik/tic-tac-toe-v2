import React from "react";
import type {MusicState} from "../useBackgroundMusic.ts";
import { useGame } from "./useGame.ts";
import "./GameBoardView.css";
import ActionButtons from "./ActionButtons.tsx";
import PlayersPresentation from "./PlayersPresentation.tsx";
import GameBoard from "./GameBoard.tsx";
import GameInfoBox from "./GameInfoBox.tsx";

interface GameBoardViewProps {
    onReturn(): void;
    toggleMusic(): void;
    musicStatus: MusicState;
}

const GameBoardView: React.FC<GameBoardViewProps> = ({onReturn, toggleMusic, musicStatus}) => {
    const {gameInfo: { board, isUserTurn, playerFigures, winnerInfo, gameEnd }, userMove, reset } = useGame();

    const returnButtonClick = () => {
        reset();
        onReturn();
    }

    return (
        <div className="game-board_container">
            <PlayersPresentation playerFigures={playerFigures} />
            <GameInfoBox
                gameEnd={gameEnd}
                winnerInfo={winnerInfo}
                playerFigures={playerFigures}
                isUserTurn={isUserTurn}
            />
            <GameBoard
                board={board}
                isWinningCell={
                    (index) => winnerInfo?.winningCombination.includes(index)
                }
                cellDisabled={gameEnd || !isUserTurn}
                onCellClick={(index) => userMove(index)}
            />
            <ActionButtons
                onReturnClick={returnButtonClick}
                onResetClick={reset}
                toggleMusic={toggleMusic}
                musicStatus={musicStatus}
            />
        </div>
    );
};

export default GameBoardView;