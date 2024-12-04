import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse/sync';


const csvFilePath = path.resolve(__dirname, 'input.csv');

const fileContent = fs.readFileSync(csvFilePath, {encoding: 'utf8'});


const csvToArray = (csv: string) => {
    return parse(csv, {
        columns: true, 
        skip_empty_lines: true, 
        trim: true,
    });
} 

const result = csvToArray(fileContent);
console.log(result);