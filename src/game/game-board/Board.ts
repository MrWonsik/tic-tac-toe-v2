import type { PlayerFigure } from "../../types.ts";

export class Board {
    private cells: Record<number, PlayerFigure | null>;

    constructor() {
        this.cells = Board.createEmptyCells()
    }

    private static createEmptyCells(): Record<number, PlayerFigure | null> {
        return {
            0: null, 1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null
        }
    };

    resetBoard(): void {
        this.cells = Board.createEmptyCells();
    }

    isFull(): boolean {
        return Object.values(this.cells).every((figure) => figure !== null);
    }

    isEmpty(): boolean {
        return Object.values(this.cells).every((figure) => figure === null);
    }

    cellIsEmpty(index: number): boolean {
        return this.cells[index] === null;
    }

    cellHasFigure(index: number) {
        return !this.cellIsEmpty(index)
    }

    cellsForFigure(figureToCheck: PlayerFigure | null): Array<number> {
        return Object.entries(this.cells)
            .filter(([, figure]) => figure === figureToCheck)
            .map(([index,]) => Number(index));
    }

    emptyCells(): Array<number> {
        return this.cellsForFigure(null);
    }

    putFigure(index: number, figure: PlayerFigure): void {
        if(this.cellIsEmpty(index)) {
            this.cells = ({ ...this.cells, [index]: figure })
        }
    }

    getCells() {
        return this.cells;
    }
}