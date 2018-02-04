import * as express from "express";
import * as request from "request";
import * as path from "path"; 
import * as bodyParser from "body-parser";
import {Table} from "./Grid";

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

app.post('/squares', (req, res) => {
    let str = "{abc}";
    console.log(req.body);
    res.send(str);
});

/**
 * Returns an array of cells 
 */
app.get('/squares:name', (req: any, res) => {
    res.send('What is up ' + req.name + "!");
});

/**
 * Returns a full Grid type
 */
app.get('/squares', (req, res) => {
    res.send(JSON.stringify(grid));
});

app.listen(3000, () => console.log('Squares listening on port 3000'));
