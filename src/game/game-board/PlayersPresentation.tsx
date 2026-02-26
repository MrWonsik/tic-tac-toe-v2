import React from 'react';
import FigureIcon from "./FigureIcon.tsx";
import type {PlayerFigures} from "../../types.ts";

interface PlayersPresentationProps {
    playerFigures: PlayerFigures
}

const PlayersPresentation: React.FC<PlayersPresentationProps> = ({ playerFigures }) => {
    return (
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
    );
};

export default PlayersPresentation;