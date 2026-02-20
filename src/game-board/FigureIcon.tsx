import type { Figure } from "../types.ts";
import "./FigureIcon.css"

interface FigureIconProps {
    figure: Figure
}

const FigureIcon: React.FC<FigureIconProps> = ({ figure }) => {
    const figureRepresentation = (() => {
        switch(figure) {
            case "circle": return "O";
            case "cross": return "X";
            default:
                console.error("Invalid figure!");
        }
    })();

    return <span className={`game_board_cell_figure game_board_cell_figure_${figure}`}>
        {figureRepresentation}
    </span>
};

export default FigureIcon;