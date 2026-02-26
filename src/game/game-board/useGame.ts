import { useEffect, useState } from "react";
import type {
    Figure,
    FigureColor,
    PlayerFigure,
    PlayerFigures,
    WinnerInformation,
    WinningCombination
} from "../../types.ts";

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

const createEmptyCells = (): Record<number, PlayerFigure | null> => ({
    0: null, 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null
});

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
    const [playerFigures, setPlayerFiguress] = useState<PlayerFigures>(randPlayerFigures());
    const [cells, setCells] = useState<Record<number, PlayerFigure | null>>(createEmptyCells());
    const [isUserTurn, setUserTurn] = useState<boolean>(shouldPlayerStart(playerFigures.mainPlayer.figure));

    useEffect(() => {
        opponentMove();
    }, [playerFigures, isUserTurn]);

    const putFigure = (index: number, figure: PlayerFigure) => {
        if(cellIsEmpty(index)) {
            setCells((prev: Record<number, PlayerFigure | null>) => ({...prev, [index]: figure }));
        }
    }

    const opponentMove = () => {
        if(isGameEnd() || isUserTurn) {
            return;
        }

        const findBestCell = () => {
            const getCriticalFields = (figureToCheck: PlayerFigure): Array<number> => {
                const fields: number[] = [];

                WINNING_COMBINATION.forEach(winCombo => {
                    const moves = Object.entries(cells).filter(([, figure]) => figure === figureToCheck).map(([index,]) => Number(index));
                    const filledCount = winCombo.filter(index => moves.includes(index)).length;
                    const emptyFields = winCombo.filter(index => cellIsEmpty(index));

                    if (filledCount === 2 && emptyFields.length === 1) {
                        fields.push(emptyFields[0]);
                    }
                });

                return fields;
            };

            const getRandomEmptyField = () => {
                const empties = Object.entries(cells).filter(([, figure]) => figure === null).map(([index]) => Number(index));
                return empties[Math.floor(Math.random() * empties.length)];
            };

            const allCellsEmpty = Object.values(cells).every((figure) => figure === null);

            if (allCellsEmpty) return 4;

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
            putFigure(findBestCell(), playerFigures.opponent);
            setUserTurn(true);
        }, OPPONTENT_THINKING_TIME_IN_MS);
    }

    const userMove = (index: number) => {
        if(isGameEnd() || (!isUserTurn && cellHasFigure(index))) {
            return;
        }
        putFigure(index, playerFigures.mainPlayer);
        setUserTurn(false)
    };

    const cellIsEmpty = (index: number) => cells[index] == null;
    const cellHasFigure = (index: number) => !cellIsEmpty(index)

    const reset = () => {
        setCells(createEmptyCells());
        const playerFigure = randPlayerFigures();
        setPlayerFiguress(playerFigure);
        setUserTurn(shouldPlayerStart(playerFigure.mainPlayer.figure));
    }

    const isGameEnd = () => {
        const allCellsFill = Object.values(cells).every((figure) => figure !== null)
        const potentialWinner = getPotentialWinner(cells);

        return Boolean(allCellsFill || potentialWinner);
    }

    return {
        gameInfo: {
            board: Object.entries(cells),
            isUserTurn,
            playerFigures,
            gameEnd: isGameEnd(),
            winnerInfo: getPotentialWinner(cells)
        },
        userMove,
        reset
    };
};