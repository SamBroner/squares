import * as express from "express";
import * as request from "request";
import * as path from "path"; 
import * as bodyParser from "body-parser";
import { Table } from "./Grid";

const app = express();

app.use(express.static('dist'));
app.use(express.static('view'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set("views", path.join(__dirname, "view"));

app.engine('html', require);

let grid = new Table.Grid();
grid.generateNumbers();
grid.prettyPrintGrid();

app.get('/', (req, res) => {
    res.render(path.join(__dirname, "../view/index.html"));
});

app.get('/sendFile', (req, res) => {
    res.sendFile(path.join(__dirname, "../view/index.html"));
});

/**
 * buy cells on grid
 */
app.post('/squares', (req, res) => {
    console.log(req.params.names);
    let cells = req.params.names as Table.Cell[];
    grid.buyCells(cells);
    res.send();
});

/**
 * patch cells on grid... this is an override!
 */
app.patch('/squares', (req, res) => {
    console.log(req.params.name);
    console.log(req.params.coordinate);
});

app.get('/prettyPrint', (req, res) => {
    grid.prettyPrintGrid();
});

/**
 * Returns a full Grid
 */
app.get('/squares', (req, res) => {
    // console.log(grid);
    // console.log(JSON.stringify(grid));
    // // res.send(JSON.stringify(grid));
    res.json(grid);
});

app.listen(3000, () => console.log('Squares listening on port 3000'));
