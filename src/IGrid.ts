export interface IGrid {
    cells: ICell[][];
}

export interface ICell {
    name: string,
    purchased: boolean,
    home: number,
    away: number

    setHome(score: number): void;

    setAway(score: number): void;

    setName(name: string): void;
}
