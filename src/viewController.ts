import {Table} from "./Grid";
import * as $ from "jquery";

async function init() {
    let d = null;
    $.ajax( {
        type: "GET",
        url: "http://localhost:3000/squares",
        dataType: "",
    }).done((data, textStatus, jqXHR) => {
        // Success
        console.log("Success");
        console.log(data);
        console.log(1);
        console.log(textStatus);
        console.log(2);
        console.log(jqXHR);
        console.log(3);
        console.log(jqXHR.responseJSON);
        console.log(4);
        // let g = data as Table.Grid;
        let grid = new Table.Grid(data as Table.Cell[][]);
        grid.prettyPrintGrid();
        // g.prettyPrintGrid();
    }).fail((res) => {
        // Aw man!
        console.log(res.responseJSON());
        // let g = JSON.parse(res) as Table.Grid;
        // g.prettyPrintGrid();
    });
    console.log(d);
}

(<any>window).instantiate = init;