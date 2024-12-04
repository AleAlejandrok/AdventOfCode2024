import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse/sync';



const csvFilePath = path.resolve(__dirname, 'input.csv');

const fileContent = fs.readFileSync(csvFilePath, {encoding: 'utf8'});


const csvToArray = (csv: string) => {
    return parse(csv, {
        skip_empty_lines: true, 
        trim: true,
    });
} 

const csvInput = csvToArray(fileContent);

let map0 = ( ()=>{
    let returnArray = []
    csvInput.forEach(element => {
        returnArray.push( element[0]);
    });
    return returnArray;
})();
let map1 = ( ()=>{
    let returnArray = []
    csvInput.forEach(element => {
        returnArray.push( element[1]);
    });
    return returnArray;
})();

console.log(map1);

map0.sort();
map1.sort();

let diffs = [];
map0.forEach((element,index) => {
    diffs.push(Math.abs(map1[index]-element));
});
let finalAnswer = 0;
diffs.forEach(element => {
    finalAnswer+=element;
});
console.log(finalAnswer);