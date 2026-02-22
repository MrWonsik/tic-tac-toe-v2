import "./GameBoardView.css";
import type { PlayerFigure } from "../types.ts";
import FigureIcon from './FigureIcon.tsx';
import { useGame } from "./useGame.ts";



interface GameBoardViewProps {
    userFigure: PlayerFigure,
    opponentFigure: PlayerFigure,
    onReturn(): void;
}

const GameBoardView: React.FC<GameBoardViewProps> = ({ userFigure, opponentFigure, onReturn }) => {
    const { board, userMove, isUsersTurn, reset } = useGame(userFigure, opponentFigure);

    const returnButtonClick = () => {
        reset();
        onReturn();
    }

    return (
        <div className="game-board_container">
            <div className="players_presentation">
                <div className="player_presentation player-1_presentation">
                    <span>Player1</span>
                    <FigureIcon playerFigure={userFigure} />
                </div>
                <div className="player_presentation player-2_presentation">
                    <span>Player2</span>
                    <FigureIcon playerFigure={opponentFigure} />
                </div>
            </div>
            <div className="game-info-box">
                <span style={{ visibility: isUsersTurn ? "visible" : "hidden" }}>
                    Your turn
                </span>
            </div>
            <div className="game-board">
                {board.map(([index, figure]) => {
                    return <div key={Number(index)} className="game-board_cell">
                        <button
                            className="game-board_cell_button"
                            onClick={() => userMove(Number(index))}
                            disabled={!isUsersTurn || figure != null}
                        >
                            {figure && <FigureIcon playerFigure={figure} />}
                        </button>
                    </div>
                })}
            </div>
            <div className="footer-buttons">
                <button onClick={returnButtonClick}>Return</button>
                <button onClick={reset}>Restart</button>
            </div>
        </div>
    );
};

export default GameBoardView;