import * as csv from 'csv-parser';
import { createReadStream } from 'fs';

interface Row {
    Report_Data_Extracted: string;
    LTC_Homes_with_Active_Outbreak: string;
    LTC_Homes_with_Resolved_Outbreak: string;
    Confirmed_Active_LTC_Resident_Cases: string;
    Confirmed_Active_LTC_HCW_Cases: string;
    Total_LTC_Resident_Deaths: string;
    Total_LTC_HCW_Deaths: string;
    Active_Outbreaks_with_No_Resident_Cases: string;
}

let secondLast: Row;
let last: Row;

const stream = createReadStream('./data/raw/ltccovidsummary.csv').pipe(csv({
      mapHeaders: ({ header, index }) => header.trim()
}));

stream.on('data', (row: Row) => {
    secondLast = last;
    last = row;
});

function getDateStr(date: Date) {
    return date.toLocaleDateString();
}

function formatDelta(n) {
return `${n >= 0 ? '+' : ''}${n}`;
}

stream.on('end', () => {
    const day = 1000 * 60 * 60 * 24;
    let now = new Date();

    console.log("last: ", last);
    const yesterday = new Date(now.getTime() - day);
    const twoDaysAgo = new Date(now.getTime() - 2 * day);

    const lastRowTime = new Date(last.Report_Data_Extracted);
    lastRowTime.setMinutes(lastRowTime.getMinutes() + lastRowTime.getTimezoneOffset());

    const secondLastRowTime = new Date(secondLast.Report_Data_Extracted);
    secondLastRowTime.setMinutes(secondLastRowTime.getMinutes() + secondLastRowTime.getTimezoneOffset());

    if (getDateStr(yesterday) !== getDateStr(lastRowTime)) {
        console.error(`Warning: Last date appears wrong: ${yesterday} !== ${lastRowTime}`);
        // return;
    }
    if (getDateStr(twoDaysAgo) !== getDateStr(secondLastRowTime)) {
        console.error(`Warning: Second last date appears wrong: ${twoDaysAgo} !== ${secondLastRowTime}`);
        // return;
    }

    let deltaResDeaths = Number(last.Total_LTC_Resident_Deaths) - Number(secondLast.Total_LTC_Resident_Deaths);
    let deltaHcwDeaths = Number(last.Total_LTC_HCW_Deaths) - Number(secondLast.Total_LTC_HCW_Deaths);
    let deltaResCases = Number(last.Confirmed_Active_LTC_Resident_Cases) - Number(secondLast.Confirmed_Active_LTC_Resident_Cases);
    let deltaHcwCases = Number(last.Confirmed_Active_LTC_HCW_Cases) - Number(secondLast.Confirmed_Active_LTC_HCW_Cases);
    let deltaOutbreaks = Number(last.LTC_Homes_with_Active_Outbreak) - Number(secondLast.LTC_Homes_with_Active_Outbreak);

    let totalResDeaths = Number(last.Total_LTC_Resident_Deaths);
    let totalHcwDeaths = Number(last.Total_LTC_HCW_Deaths);
    let activeOutbreaks = Number(last.LTC_Homes_with_Active_Outbreak);
    let activeResCases = Number(last.Confirmed_Active_LTC_Resident_Cases);
    let activeHcwCases = Number(last.Confirmed_Active_LTC_HCW_Cases);

    console.log(`Here are the raw stats:
◾${totalResDeaths} total resident deaths (${formatDelta(deltaResDeaths)})
◾${totalHcwDeaths} total HCW deaths (${formatDelta(deltaHcwDeaths)})
◾${activeOutbreaks} homes with active outbreak (${formatDelta(deltaOutbreaks)})
◾${activeResCases} active LTC resident cases (${formatDelta(deltaResCases)})
◾${activeHcwCases} active LTC HCW cases (${formatDelta(deltaHcwCases)}) `);
});

