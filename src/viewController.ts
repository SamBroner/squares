import {Table} from "./Grid";
import * as $ from "jquery";

async function init() {
    let d = null;
    $.ajax( {
        type: "GET",
        url: "http://localhost:3000/squares",
        dataType: "json",
    }).done((res) => {
        // Success
        console.log(res);
        let g = JSON.parse(res) as Table.Grid;
        g.prettyPrintGrid();
    }).fail((res) => {
        // Aw man!
        console.log(res);
    });
    console.log(d);
}

(<any>window).instantiate = init;