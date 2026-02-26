export type Figure = "circle" | "cross";

export type FigureColor = "green" | "red";

export type PlayerFigure = {
    figure: Figure,
    color: FigureColor
}

export type WinningCombination = [number, number, number];

export interface WinnerInformation {
    winningCombination: WinningCombination,
    winningFigure: PlayerFigure
}

export type PlayerFigures = { mainPlayer: PlayerFigure, opponent: PlayerFigure }