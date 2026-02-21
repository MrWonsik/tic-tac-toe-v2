import type { PlayerFigure } from "../types.ts";
import "./FigureIcon.css"

interface FigureIconProps {
    playerFigure: PlayerFigure
}

const FigureIcon: React.FC<FigureIconProps> = ({ playerFigure }) => {
    const figureRepresentation = (() => {
        switch(playerFigure.figure) {
            case "circle": return "O";
            case "cross": return "X";
            default:
                console.error("Invalid figure!");
        }
    })();

    return <span className={`game_board_cell_figure game_board_cell_figure_${playerFigure.color}`}>
        {figureRepresentation}
    </span>
};

export default FigureIcon;