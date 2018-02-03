import * as express from "express";
import * as request from "request";
import * as path from "path"; 

const app = express();

app.get('/', (req, res) => {
    // res.send("okay!");
    console.log(path.join(__dirname, "../view/index.html"));
    res.render(path.join(__dirname, "../view/index.html"));
});

app.get('/sendFile', (req, res) => {
    res.sendFile(path.join(__dirname, "../view/index.html"));
});

app.listen(3000, () => console.log('Squares listening on port 3000'));

app.use(express.static('dist'));
app.use(express.static('view'));
app.set("views", path.join(__dirname, "view"));

app.engine('html', require)
