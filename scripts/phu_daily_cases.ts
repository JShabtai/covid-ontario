import * as csv from 'csv-parser';
import { createReadStream, writeFileSync } from 'fs';

interface Row {
  FILE_DATE: string;
  PHU_NAME: string;
  PHU_NUM: string;
  ACTIVE_CASES: string;
  RESOLVED_CASES: string;
  DEATHS: string;
}

const stream = createReadStream('./data/raw/cases_by_status_and_phu.csv').pipe(csv({
      mapHeaders: ({ header, index }) => header.trim()
}))
const outFile = './src/assets/cases_by_status_and_phu.json';

interface DayData {
    date: string;
    total: number;
    active: number;
    resolved: number;
    deaths: number;
}

interface Phu {
    id: string;
    cases: Record<string, DayData>;
}

const phus: Record<string, Phu> = {};
const cases: Record<string, Record<string, number>> = {};
const dates: Record<string, unknown> = {};

stream.on('data', (row: Row) => {
    const phuId = row['PHU_NUM'];
    const date = row['FILE_DATE'];

    if (!phus[phuId]) {
        phus[phuId] = {
            id: phuId,
            cases: {},
        };
    }

    const phu = phus[phuId]

    if (!phu.cases[date]) {
        const active = Number(row['ACTIVE_CASES']);
        const resolved = Number(row['RESOLVED_CASES']);
        const deaths = Number(row['DEATHS']);
        phu.cases[date] = {
            date,
            active,
            resolved,
            deaths,
            total: active + resolved + deaths,
        };
    }

    dates[date] = 1;
});

stream.on('end', () => {
    const datesArray = Object.keys(dates).sort();
    const output: any = {
        phus: {},
        dates: datesArray,
    };

    for (let phuId of Object.keys(phus)) {
        if (phuId === '') {
            continue;
        }
        const phu = phus[phuId];
        const phuData: any = {
            id: phu.id,
            dailyCases: datesArray.map((date, index) => {
                if (phu.cases[date]) {
                    if (index > 0 && phu.cases[datesArray[index - 1]]) {
                        return phu.cases[date].total - phu.cases[datesArray[index-1]].total;
                    }
                    else {
                        return phu.cases[date].total;
                    }
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

