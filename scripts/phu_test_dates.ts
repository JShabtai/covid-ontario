import * as csv from 'csv-parser';
import { createReadStream, writeFileSync } from 'fs';

interface Row {
   Specimen_Date: string;
   Reporting_PHU: string;
   Reporting_PHU_ID: string;
}

const stream = createReadStream('./data/raw/conposcovidloc.csv').pipe(csv({
      mapHeaders: ({ header, index }) => header.trim()
}))
const outFile = './src/assets/phu_daily_cases.json';

interface DayData {
    date: string;
    newCases: number;
}

interface Phu {
    id: string;
    name: string;
    cases: Record<string, DayData>;
}

const phus: Record<string, Phu> = {};
const cases: Record<string, Record<string, number>> = {};
const dates: Record<string, unknown> = {};

stream.on('data', (row: Row) => {
    const phuName = row['Reporting_PHU'];
    const date = row['Specimen_Date'];

    if (!phus[phuName]) {
        phus[phuName] = {
            id: row['Reporting_PHU_ID'],
            name: phuName,
            cases: {},
        };
    }

    const phu = phus[phuName]

    if (!phu.cases[date]) {
        phu.cases[date] = {
            date,
            newCases: 0,
        };
    }

    phu.cases[date].newCases += 1;
    dates[date] = 1;
});

stream.on('end', () => {
    // Sort and trim off last 5 days as they're very unstable
    const datesArray = Object.keys(dates).sort().slice(0, Object.keys(dates).length - 5);
    const output: any = {
        phus: {},
        dates: datesArray,
    };

    for (let phuName of Object.keys(phus)) {
        const phu = phus[phuName];
        const phuData: any = {
            name: phu.name,
            id: phu.id,
            dailyCases: datesArray.map((date) => {
                if (phu.cases[date]) {
                    return phu.cases[date].newCases;
                }
                else {
                    return 0;
                }
            }),
        };
        output.phus[phu.id] = phuData;
    }
    console.log(JSON.stringify(output, null, 2));

    writeFileSync(outFile, JSON.stringify(output));
});

