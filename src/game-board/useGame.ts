import {useEffect, useState} from "react";
import type {PlayerFigure} from "../types.ts";

const OPPONTENT_THINKING_TIME_IN_MS = 500;

const emptyCells: Record<number, PlayerFigure | null> = {
    0: null, 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null
}

export const useGame = (userFigure: PlayerFigure, opponentFigure: PlayerFigure) => {
    const [cells, setCells] = useState<Record<number, PlayerFigure | null>>(emptyCells);
    const userFirst = userFigure.figure === "circle";
    const [isUsersTurn, setUsersTurn] = useState<boolean>(userFirst);

    useEffect(() => {
        if(!isUsersTurn) {
            opponentMove();
        }
    }, [isUsersTurn]);

    const putFigure = (index: number, figure: PlayerFigure) => {
        /*
          ADR: Handle StrictMode double render for opponent move

          In React 18 StrictMode (development), components are rendered twice
          on mount to detect side-effects. This can cause the opponent
          to execute two moves on initial render.

          To address this without disabling StrictMode, I validate moves by
          checking the absolute difference between the number of player and
          opponent figures on the board. Only allow a move if the difference
          is 0 or 1. This keeps move order correct while keeping StrictMode active.
        */
        const canMove = () => {
            const userCount = board().filter(([, playerFigure]) => playerFigure != null && playerFigure.figure === userFigure.figure).length;
            const opponentCount = board().filter(([, playerFigure]) => playerFigure != null && playerFigure.figure === opponentFigure.figure).length;
            return Math.abs(userCount - opponentCount) <= 1;
        };

        if(cellsEmpty(index) && canMove()) {
            setCells((prev: Record<number, PlayerFigure | null>) => ({...prev, [index]: figure }));
        }
    }

    const board = () => {
        return Object.entries(cells);
    }

    const opponentMove = () => {
        if(isGameFinished() || isUsersTurn) {
            return;
        }
        const availableIndexes = board().filter(([, figure]) => figure == null).map(([index]) => Number(index));
        setTimeout(() => {
            putFigure(availableIndexes[Math.floor(Math.random() * availableIndexes.length)], opponentFigure);
            setUsersTurn(true);
        }, OPPONTENT_THINKING_TIME_IN_MS);
    }

    const userMove = (index: number) => {
        if(isGameFinished() || (!isUsersTurn && cellsHasFigure(index))) {
            return;
        }
        putFigure(index, userFigure);
        setUsersTurn(false)
    };

    const isGameFinished = () => {
        const hasTheSameFigure = (cell1: PlayerFigure | null, cell2: PlayerFigure | null, cell3: PlayerFigure | null) => {
            return cell1 && cell2 && cell3 &&
                cell1.figure === cell2.figure &&
                cell1.figure === cell3.figure &&
                cell2.figure === cell3.figure;
        }

        if(
            hasTheSameFigure(cells[0], cells[1], cells[2]) ||
            hasTheSameFigure(cells[3], cells[4], cells[5]) ||
            hasTheSameFigure(cells[6], cells[7], cells[8]) ||
            hasTheSameFigure(cells[0], cells[3], cells[6]) ||
            hasTheSameFigure(cells[1], cells[4], cells[7]) ||
            hasTheSameFigure(cells[2], cells[5], cells[5]) ||
            hasTheSameFigure(cells[0], cells[4], cells[8]) ||
            hasTheSameFigure(cells[6], cells[4], cells[2])
        ) {
            alert("End of the game!");
            return true;
        }
        return false;
    }

    const cellsEmpty = (index: number) => cells[index] == null;
    const cellsHasFigure = (index: number) => !cellsEmpty(index)

    return { board: board(), userMove, isUsersTurn };
};