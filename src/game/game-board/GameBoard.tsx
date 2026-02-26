import React from 'react';
import FigureIcon from "./FigureIcon.tsx";
import type {PlayerFigure} from "../../types.ts";

interface GameBoardProps {
    board: [string, PlayerFigure | null][],
    isWinningCell(index: number): boolean | undefined,
    cellDisabled: boolean,
    onCellClick(index: number): void
}

const GameBoard: React.FC<GameBoardProps> = ({ board, isWinningCell, cellDisabled, onCellClick}) => {
    return (
        <div className="game-board">
            {board.map(([index, figure]) => (
                <div
                    key={Number(index)}
                    className={isWinningCell(Number(index))
                        ? "game-board_cell_win game-board_cell"
                        : "game-board_cell"
                    }
                >
                    <button
                        className="game-board_cell_button"
                        onClick={() => onCellClick(Number(index))}
                        disabled={cellDisabled || figure != null}
                    >
                        {figure && <FigureIcon playerFigure={figure}/>}
                    </button>
                </div>
            ))}
        </div>
    );
};

export default GameBoard;