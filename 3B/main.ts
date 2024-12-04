import * as fs from "fs";
import * as path from "path";
import { parse } from 'csv-parse/sync';

const csvFilePath = path.resolve(__dirname, 'input.csv');
const fileContent = fs.readFileSync(csvFilePath, {encoding: 'utf8'});
const csvToArray = (csv: string) => {
    return csv.trim().split(`\n`).map(row => row.replace('\r', ''));
} 
const input = csvToArray(fileContent);

const multiplyRegex:RegExp = new RegExp("(mul\\(\\d+,\\d+\\)|do\\(\\)|don't\\(\\))", "g");
let lineMatches:string[] = [];
input.forEach(line =>{
    lineMatches = lineMatches.concat( Array.from(line.match(multiplyRegex), match => match));
});

let output:number = 0;
let executionBool:boolean = true;
const mul = (num1:number,num2:number) =>{
    return num1*num2;
};
lineMatches.forEach(match =>{
    if(match ==='do()') 
        executionBool = true;
    else if(match === `don't()`)
        executionBool = false;
    else if(executionBool){
        output += eval(match);
    }
});
console.log(output)


