import {useEffect, useState} from "react";
import type {Figure, FigureColor, PlayerFigure} from "../../types.ts";

const OPPONTENT_THINKING_TIME_IN_MS = 500;
const PLAYER_COLOR: FigureColor = "green";
const OPPONENT_COLOR: FigureColor = "red";

type WinningCombination = [number, number, number];

const WINNING_COMBINATION: Array<WinningCombination> = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [6, 4, 2],
];


const randPlayerFigures = () => {
    const mainPlayer = { figure: randomFigure(), color: PLAYER_COLOR };
    const opponent = obtainOpponentFigure(mainPlayer);
    return { mainPlayer, opponent}
}

const obtainOpponentFigure = (userFigure: PlayerFigure): PlayerFigure => {
    const opponentFigure = userFigure.figure === "circle" ? "cross" : "circle";
    return {
        figure: opponentFigure,
        color: OPPONENT_COLOR
    }
}

const randomFigure = (): Figure => {
    const figures: Array<Figure> = ["circle", "cross"];
    const index = Math.floor(Math.random() * figures.length);
    return figures[index];
}

const emptyCells: Record<number, PlayerFigure | null> = {
    0: null, 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null
}

export const useGame = () => {
    const [playerFigures, setPlayerFiguress] = useState<{ mainPlayer: PlayerFigure, opponent: PlayerFigure }>(randPlayerFigures());
    const [cells, setCells] = useState<Record<number, PlayerFigure | null>>(emptyCells);
    const [isUserTurn, setUserTurn] = useState<boolean>(playerFigures.mainPlayer.figure === "circle");

    useEffect(() => {
        const potentialWinner = getPotentialWinner();
        if (potentialWinner !== null) {
            console.log(potentialWinner);
        }
    }, [cells])

    useEffect(() => {
        if(!isUserTurn) {
            opponentMove();
        }
    }, [isUserTurn]);

    useEffect(() => {
        setUserTurn(playerFigures.mainPlayer.figure === "circle");
    }, [playerFigures])

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
            const userCount = board().filter(([, playerFigure]) => playerFigure != null && playerFigure.figure === playerFigures.mainPlayer.figure).length;
            const opponentCount = board().filter(([, playerFigure]) => playerFigure != null && playerFigure.figure === playerFigures.opponent.figure).length;
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
        if(getPotentialWinner() || isUserTurn) {
            return;
        }
        const availableIndexes = board().filter(([, figure]) => figure == null).map(([index]) => Number(index));
        setTimeout(() => {
            putFigure(availableIndexes[Math.floor(Math.random() * availableIndexes.length)], playerFigures.opponent);
            setUserTurn(true);
        }, OPPONTENT_THINKING_TIME_IN_MS);
    }

    const userMove = (index: number) => {
        if(getPotentialWinner() || (!isUserTurn && cellsHasFigure(index))) {
            return;
        }
        putFigure(index, playerFigures.mainPlayer);
        setUserTurn(false)
    };

    const getPotentialWinner = (): { winningCombination: WinningCombination, winningFigure: PlayerFigure } | null => {
        for (const [a, b, c] of WINNING_COMBINATION) {
            const cell1 = cells[a];
            const cell2 = cells[b];
            const cell3 = cells[c];

            if (
                cell1 && cell2 && cell3 &&
                cell1.figure === cell2.figure &&
                cell1.figure === cell3.figure
            ) {
                return {
                    winningCombination: [a, b, c],
                    winningFigure: cell1
                };
            }
        }
        return null;
    };

    const cellsEmpty = (index: number) => cells[index] == null;
    const cellsHasFigure = (index: number) => !cellsEmpty(index)

    const reset = () => {
        setCells(emptyCells);
        setPlayerFiguress(randPlayerFigures());
    }

    return { board: board(), userMove, isUserTurn, reset, playerFigures };
};