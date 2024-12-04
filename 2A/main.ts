import * as fs from "fs";
import * as path from "path";


const csvFilePath = path.resolve(__dirname, 'input.csv');

const fileContent = fs.readFileSync(csvFilePath, {encoding: 'utf8'});


const csvToArray = (csv: string) => {
    const rows:string[] = csv.trim().split(`\n`).map(row => row.replace('\r', ''));
    const result:number[][] = rows.map(row =>row.split(` `).map(value => parseInt(value, 10)));
    return result;
} 

const input = csvToArray(fileContent);
console.log(input);
let safeReports = 0;
input.forEach(line => {
    if(line[0]<line[1]){
        //increase logic
        line.every((level,index) => {
            if(index == line.length-1){
                safeReports++;
                return false;
            }else if(level < line[index+1]&& Math.abs(level - line[index+1])<=3){
                return true;
            }else{
                return false;
            }
        });
    }
    else{
        line.every((level,index) => {
            if(index == line.length-1){
                safeReports++;
                return false;
            }else if((level > line[index+1])&& (Math.abs(line[index+1]-level)<=3)){
                return true;
            }else{
                return false;
            }
        });
    }
});
console.log(safeReports);
