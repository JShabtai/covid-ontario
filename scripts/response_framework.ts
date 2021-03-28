import * as csv from 'csv-parser';
import { createReadStream, writeFileSync } from 'fs';

interface Row {
  Reporting_PHU_id: string;
  Status_PHU: string;
  start_date: string;
  end_date: string;
}

const stream = createReadStream('./data/raw/response_framework.csv').pipe(csv({
      mapHeaders: ({ header, index }) => header.trim()
}))
const outFile = './src/assets/response_framework.json';

interface ResponseFramework {
    [id: string]: {
        status: string;
        start: string;
        end: string;
    }[];
}

const responseFramework = {};

stream.on('data', (row: Row) => {
    if (!responseFramework[row.Reporting_PHU_id]) {
        responseFramework[row.Reporting_PHU_id] = [];
    }

    responseFramework[row.Reporting_PHU_id].push({
        status: row.Status_PHU,
        start: row.start_date.substr(0, 10),
        end: row.end_date.substr(0, 10),
    });
});

stream.on('end', () => {
    console.log(JSON.stringify(responseFramework, null, 2));

    writeFileSync(outFile, JSON.stringify(responseFramework));
});

