import * as csv from 'csv-parser';
import { createReadStream, writeFileSync } from 'fs';

interface Row {
   Region: string;
   PHU_NUM: string;
   Population: string;
}

const stream = createReadStream('./src/assets/phu_populations.csv').pipe(csv({
      mapHeaders: ({ header, index }) => header.trim()
}))
const outFile = './src/assets/phu_metadata.json';

interface Phu {
    name: string;
    population: number;
    id: string;
}

const phus: Record<string, Phu> = {
};

stream.on('data', (row: Row) => {
    phus[row['PHU_NUM']] = {
        name: row['Region'],
        id: row['PHU_NUM'],
        population: Number(row['Population']),
    }
});

stream.on('end', () => {
    console.log(JSON.stringify(phus, null, 4));

    writeFileSync(outFile, JSON.stringify(phus, null, 4));
});

