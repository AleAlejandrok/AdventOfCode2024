import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse/sync';



const csvFilePath = path.resolve(__dirname, 'input.csv');

const fileContent = fs.readFileSync(csvFilePath, {encoding: 'utf8'});


const csvToArray = (csv: string) => {
    return parse(csv, {
        skip_empty_lines: true, 
        trim: true,
        delimiter: ',',
        
    });
} 

const csvInput = csvToArray(fileContent);

let map0 = ( ()=>{
    let returnArray = []
    csvInput.forEach(element => {
        returnArray.push( Number(element[0]));
    });
    return returnArray;
})();
let map1 = ( ()=>{
    let returnArray = []
    csvInput.forEach(element => {
        returnArray.push( Number(element[1]));
    });
    return returnArray;
})();

//main logic
let map1map = [];
map1.forEach(locationId =>{
    map1map[locationId] ? map1map[locationId]++ : map1map[locationId]=1;
});

let result = 0;
map0.forEach(locationId =>{
    if(map1map[locationId]){
        result += map1map[locationId] * locationId;
    }
});
console.log(result);