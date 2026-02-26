import {useEffect, useRef, useState} from "react";
import type {
    Figure,
    FigureColor,
    PlayerFigure,
    PlayerFigures,
    WinnerInformation,
    WinningCombination
} from "../../types.ts";
import {Board} from "./Board.ts";

const OPPONTENT_THINKING_TIME_IN_MS = 500;
const PLAYER_COLOR: FigureColor = "green";
const OPPONENT_COLOR: FigureColor = "red";

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

function getPotentialWinner(cells: Record<number, PlayerFigure | null>): WinnerInformation | null {
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

const shouldPlayerStart = (playerFigure: Figure) => {
    return playerFigure === "circle";
}

export const useGame = () => {
    const board = useRef(new Board())
    const [playerFigures, setPlayerFiguress] = useState<PlayerFigures>(randPlayerFigures());
    const [isUserTurn, setUserTurn] = useState<boolean>(shouldPlayerStart(playerFigures.mainPlayer.figure));

    useEffect(() => {
        opponentMove();
    }, [playerFigures, isUserTurn]);

    const opponentMove = () => {
        if(isGameEnd() || isUserTurn) {
            return;
        }

        const findBestCell = () => {
            const getCriticalFields = (figureToCheck: PlayerFigure): Array<number> => {
                const fields: number[] = [];

                WINNING_COMBINATION.forEach(winCombo => {
                    const moves: Array<number> = board.current.cellsForFigure(figureToCheck);
                    const filledCount = winCombo.filter(index => moves.includes(index)).length;
                    const emptyFields = winCombo.filter(index => board.current.cellIsEmpty(index));

                    if (filledCount === 2 && emptyFields.length === 1) {
                        fields.push(emptyFields[0]);
                    }
                });

                return fields;
            };

            const getRandomEmptyField = () => {
                const empties = board.current.emptyCells()
                return empties[Math.floor(Math.random() * empties.length)];
            };

            if (board.current.isEmpty()) return 4;

            const winningFields = getCriticalFields(playerFigures.opponent);
            if (winningFields.length > 0) {
                return winningFields[Math.floor(Math.random() * winningFields.length)];
            }

            const blockingFields = getCriticalFields(playerFigures.mainPlayer);
            if (blockingFields.length > 0) {
                return blockingFields[Math.floor(Math.random() * blockingFields.length)];
            }

            return getRandomEmptyField();
        }

        setTimeout(() => {
            if (isGameEnd()) return;
            board.current.putFigure(findBestCell(), playerFigures.opponent);
            setUserTurn(true);
        }, OPPONTENT_THINKING_TIME_IN_MS);
    }

    const userMove = (index: number) => {
        if(isGameEnd() || (!isUserTurn && board.current.cellHasFigure(index))) {
            return;
        }
        board.current.putFigure(index, playerFigures.mainPlayer);
        setUserTurn(false)
    };

    const reset = () => {
        board.current.resetBoard();
        const playerFigure = randPlayerFigures();
        setPlayerFiguress(playerFigure);
        setUserTurn(shouldPlayerStart(playerFigure.mainPlayer.figure));
    }

    const isGameEnd = () => {
        const potentialWinner = getPotentialWinner(board.current.getCells());

        return Boolean(board.current.isFull() || potentialWinner);
    }

    return {
        gameInfo: {
            board: Object.entries(board.current.getCells()),
            isUserTurn,
            playerFigures,
            gameEnd: isGameEnd(),
            winnerInfo: getPotentialWinner(board.current.getCells())
        },
        userMove,
        reset
    };
};