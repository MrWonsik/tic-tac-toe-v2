import { useState } from 'react';
import "./GameBoardView.css";
import type {Figure} from "../types.ts";
import FigureIcon from './FigureIcon.tsx';


const emptyCells: Record<number, Figure | null> = {
    0: "circle", 1: "cross", 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null
}

const GameBoardView = () => {
    const [userFigure, setUserFigure] = useState<Figure>("circle");
    const [isUsersTurn, setUsersTurn] = useState<boolean>(true);
    const [cellsArray, setCellsArray] = useState<Record<number, Figure | null>>(emptyCells);

    const checkTheCell = (index: number, figure: Figure | null)  => {
        if(cellsArray[index] == null) {
            setCellsArray({...cellsArray, [index]: figure});
        }
    }


    return (
        <div className="game-board_container">
            <div className="players_presentation">
                <div className="player_presentation player-1_presentation">
                    <span>Player1</span>
                    <FigureIcon figure={userFigure} />
                </div>
                <div className="player_presentation player-2_presentation">
                    <span>Player2</span>
                    <FigureIcon figure={userFigure == "circle" ? "cross" : "circle" } />
                </div>
            </div>
            <div className="game-info-box">Your turn</div>
            <div className="game-board">
                {Object.entries(cellsArray).map(([index, figure]) => {
                    return <div className="game-board_cell">
                        <button
                            className="game-board_cell_button"
                            onClick={() => checkTheCell(Number(index), userFigure)}
                            disabled={figure != null}
                        >
                            {figure && <FigureIcon figure={figure} />}
                        </button>
                    </div>
                })}
            </div>
        </div>
    );
};

export default GameBoardView;