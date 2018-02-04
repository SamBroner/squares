
export module Table {

    export interface IGrid {
        cells: ICell[][];
    }
    
    export interface ICell {
        name: string,
        purchased: boolean,
        home: number,
        away: number,
        c: Coordinate
    
        setHome(score: number): void;
    
        setAway(score: number): void;
    
        setName(name: string): void;
    }
    
    export class Grid implements IGrid {
        cells: ICell[][];
    
        constructor(cells?: ICell[][]) {
            if (cells) {
                console.log("cells were there");
                this.cells = cells;
            } else {
                console.log("aw man");
                this.cells = [];
                for(let i = 0; i < 10; i++){
                    this.cells[i] = [];
                    for(let j = 0; j < 10; j++) {
                        let c = new Coordinate(i, j);
                        this.cells[i][j] = new Cell(c);
                    }
                }
            }
        }
    
        public generateNumbers(): void {
            console.log("generateNumbers");
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

        private shuffle(): number[] {
            console.log("shuffle");
            let numbers: number[] = [];
            for (var a = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], i = a.length; i--; ) {
                var random = a.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
                numbers[i] = random;
            }
            return numbers;
        }
    
        public prettyPrintGrid(): void {
            console.log("prettyPrintGrid");

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
    
        public buyCells(cells: Cell[]) {
            console.log("buyCells");
            for (let i = 0; i < cells.length; i++) {
                if (this.getCellByCell(cells[i]).purchased) {
                    // Cell was already purchased!
                    console.error("Ahh! Overlap");
                }
            }

            for (let i = 0; i < cells.length; i++) {
                this.getCellByCell(cells[i]).purchased = true;
                this.getCellByCell(cells[i]).name = cells[i].name;
            }
        }

        private getCellByCell(cell: ICell) {
            return this.getCell(cell.c);
        }

        private getCell(c: Coordinate): Cell {
            return this.cells[c.x][c.y];
        }
    }
    
    export class Cell implements ICell {
        name: string;
        purchased: boolean;
        home: number;
        away: number;
        c: Coordinate;

        constructor(c: Coordinate) {
            this.purchased = false;
            this.home = -1;
            this.away = -1;
            this.name = "";
            this.c = c;
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

        constructor(x: number, y: number) {
            this.x = x;
            this.y = y;
        }
    }
}
