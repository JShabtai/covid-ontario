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

const stream = createReadStream('./data/raw/ltccovidsummary.csv').pipe(csv())
stream.on('data', (row: Row) => {
    secondLast = last;
    last = row;
});

function getDateStr(date: Date) {
    return date.toLocaleDateString();
}

stream.on('end', () => {
    const day = 1000 * 60 * 60 * 24;
    let now = new Date();

    const yesterday = new Date(now.getTime() - day);
    const twoDaysAgo = new Date(now.getTime() - 2 * day);

    const lastRowTime = new Date(last.Report_Data_Extracted);
    lastRowTime.setMinutes(lastRowTime.getMinutes() + lastRowTime.getTimezoneOffset());

    const secondLastRowTime = new Date(secondLast.Report_Data_Extracted);
    secondLastRowTime.setMinutes(secondLastRowTime.getMinutes() + secondLastRowTime.getTimezoneOffset());

    if (getDateStr(yesterday) !== getDateStr(lastRowTime)) {
        console.error('Warning: Last date appears wrong');
        return;
    }
    if (getDateStr(twoDaysAgo) !== getDateStr(secondLastRowTime)) {
        console.error('Warning: Second last date appears wrong');
        return;
    }

    let deltaDeaths = Number(last.Total_LTC_Resident_Deaths) - Number(secondLast.Total_LTC_Resident_Deaths);
    let deltaResCase = Number(last.Confirmed_Active_LTC_Resident_Cases) - Number(secondLast.Confirmed_Active_LTC_Resident_Cases);
    let deltaHcwCase = Number(last.Confirmed_Active_LTC_HCW_Cases) - Number(secondLast.Confirmed_Active_LTC_HCW_Cases);
    let deltaOutbreaks = Number(last.LTC_Homes_with_Active_Outbreak) - Number(secondLast.LTC_Homes_with_Active_Outbreak);

    let activeOutbreaks = Number(last.LTC_Homes_with_Active_Outbreak);
    let activeResCases = Number(last.Confirmed_Active_LTC_Resident_Cases);
    let activeHcwCases = Number(last.Confirmed_Active_LTC_HCW_Cases);

    console.log(`Here are the raw stats:
◾${deltaDeaths} new resident death
◾${activeOutbreaks} homes with active outbreak (${deltaOutbreaks >= 0 ? '+' : ''}${deltaOutbreaks})
◾${activeResCases} active LTC resident cases (${deltaResCase >= 0 ? '+' : ''}${deltaResCase})
◾${activeHcwCases} active LTC worker cases (${deltaHcwCase >= 0 ? '+' : ''}${deltaHcwCase}) `);
});

