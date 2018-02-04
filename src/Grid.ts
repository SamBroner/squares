

export module Table {

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
    
    export class Grid implements IGrid {
        cells: ICell[][];
    
        constructor() {
            this.cells = [];
            for(let i = 0; i < 10; i++){
                this.cells[i] = [];
                for(let j = 0; j < 10; j++) {
                    this.cells[i][j] = new Cell(i, j);
                }
            }
        }
    
        generateNumbers(): void {

            let home = this.shuffle();
            let away = this.shuffle();

            // Add home team numbers;
            for(let i = 0; i < 10; i++){
                for(let j = 0; j < 10; j++) {
                    this.cells[i][j].setHome(home[j]);
                    this.cells[i][j].setAway(away[i]);
                }
            }
            return;
        }

        shuffle(): number[] {

            let numbers: number[] = [];
            for (var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], i = a.length; i--; ) {
                var random = a.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
                numbers[i] = random;
            }
            return numbers;
        }
    
        prettyPrintGrid(): void {
            console.log()
            let row: string = "   ";
            for(let i = 0; i < 10; i++){
                row += "( " + this.cells[0][i].home + " ) ";
            }
            console.log(row);

            for(let i = 0; i < 10; i++){
                row = "_" + this.cells[i][0].away + "_";
                for(let j = 0; j < 10; j++) {
                    row += "(" + this.cells[i][j].away + "," + this.cells[i][j].home + ") ";
                }
                console.log(row);
            }
        }
    
        addNames(names: string[], cs: Coordinate[]) {
            for (let x = 0; x < cs.length; x++) {
                this.addName(names[x], cs[x]);
            }
        }

        addName(name: string, c: Coordinate) {

        }
    }
    
    export class Cell implements ICell {
        name: string;
        purchased: boolean;
        home: number;
        away: number;
    
        constructor(private c: Coordinate) {
            this.purchased = false;
            this.home = -1;
            this.away = -1;
            this.name = "";
        }
    
        setHome(score: number): void {
            this.home = score;
        }
    
        setAway(score: number): void {
            this.away = score;
        }
    
        setName(name: string): void {
            this.purchased = true;
            this.name = name;
        }
    }

    export class Coordinate {
        x: number;
        y: number;
    }
}
