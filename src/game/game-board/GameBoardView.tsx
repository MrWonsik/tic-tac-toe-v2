import React from "react";
import { MdArrowBack, MdMusicNote, MdMusicOff, MdOutlineRefresh  } from 'react-icons/md';
import FigureIcon from './FigureIcon.tsx';
import { useGame } from "./useGame.ts";
import "./GameBoardView.css";
import type {MusicState} from "../useBackgroundMusic.ts";

interface GameBoardViewProps {
    onReturn(): void;
    toggleMusic(): void;
    musicStatus: MusicState;
}

const GameBoardView: React.FC<GameBoardViewProps> = ({ onReturn, toggleMusic, musicStatus }) => {
    const { board, userMove, isUserTurn, reset, playerFigures } = useGame();

    const returnButtonClick = () => {
        reset();
        onReturn();
    }

    const generateMusicIcon = () => {
        console.log(musicStatus);
        switch(musicStatus) {
            case "play": return <MdMusicNote className="footer-button_icon" />
            case "pause": return <MdMusicOff className="footer-button_icon" />
            case "invalid":
            default:
                return;
        }
    }

    return (
        <div className="game-board_container">
            <div className="players_presentation">
                <div className="player_presentation player-1_presentation">
                    <span>Player1</span>
                    <FigureIcon playerFigure={playerFigures.mainPlayer}/>
                </div>
                <div className="player_presentation player-2_presentation">
                    <span>Player2</span>
                    <FigureIcon playerFigure={playerFigures.opponent}/>
                </div>
            </div>
            <div className="game-info-box">
                <span style={{ visibility: isUserTurn ? "visible" : "hidden"}}>
                    Your turn
                </span>
            </div>
            <div className="game-board">
                {board.map(([index, figure]) => {
                    return <div key={Number(index)} className="game-board_cell">
                        <button
                            className="game-board_cell_button"
                            onClick={() => userMove(Number(index))}
                            disabled={!isUserTurn || figure != null}
                        >
                            {figure && <FigureIcon playerFigure={figure}/>}
                        </button>
                    </div>
                })}
            </div>
            <div className="footer-buttons">
                <button className="footer-button" onClick={returnButtonClick}>
                    <MdArrowBack className="footer-button_icon" />
                </button>
                <button className="footer-button" onClick={reset}>
                    <MdOutlineRefresh className="footer-button_icon" />
                </button>
                <button className="footer-button" onClick={toggleMusic}>
                    {generateMusicIcon()}
                </button>
            </div>
        </div>
    );
};

export default GameBoardView;