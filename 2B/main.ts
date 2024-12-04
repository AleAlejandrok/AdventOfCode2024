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
let dampenerAvail;


const isDecreasing = (line:number[]):boolean=>{
    let isSafeReport = false;
    let dampener = true;
    line.every((level,index)=>{
        if(index == line.length-1){
            isSafeReport = true;
            return false;
        }
        else if(level > line[index+1] && Math.abs(level - line[index+1])<=3)
            return true;
        else if(dampener){
            dampener = false;
            line.splice(index+1,1);
            isSafeReport = (index == line.length-1);
            return (level > line[index+1] && Math.abs(level - line[index+1])<=3);
        }
        else
            return false;
    });
    return isSafeReport;
}
const isIncreasing = (line:number[]):boolean=>{
    let isSafeReport = false;
    let dampener = true;
    line.every((level,index)=>{
        if(index == line.length-1){
            isSafeReport = true;
            return false;
        }
        else if(level < line[index+1] && Math.abs(level - line[index+1])<4)
            return true;
        else if(dampener){
            dampener = false;
            line.splice(index+1,1);
            isSafeReport = (index == line.length-1);
            return (level < line[index+1] && Math.abs(level - line[index+1])<4);
        }
        else
            return false;
    });
    return isSafeReport;
}

input.forEach(line => {
    if(line[0]==line[line.length-1])
        return;
    else if(line[0]>line[line.length-1])
        //decreasing
        safeReports += Number(isDecreasing(line) )
    else if(line[0]<line[line.length-1])
        //increasing
        safeReports += Number(isIncreasing(line) )
});
console.log(safeReports);
