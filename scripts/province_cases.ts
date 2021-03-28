import * as csv from 'csv-parser';
import { createReadStream, writeFileSync } from 'fs';

interface Row {
    'Reported Date': string;
    'Confirmed Negative': string;
    'Presumptive Negative': string;
    'Presumptive Positive': string;
    'Confirmed Positive': string;
    'Resolved': string;
    'Deaths': string;
    'Total Cases': string;
    'Total patients approved for testing as of Reporting Date': string;
    'Total tests completed in the last day': string;
    'Percent positive tests in last day': string;
    'Under Investigation': string;
    'Number of patients hospitalized with COVID-19': string;
    'Number of patients in ICU with COVID-19': string;
    'Number of patients in ICU on a ventilator with COVID-19': string;
    'Total Positive LTC Resident Cases': string;
    'Total Positive LTC HCW Cases': string;
    'Total LTC Resident Deaths': string;
    'Total LTC HCW Deaths': string;
    'Total_Lineage_B.1.1.7': string;
    'Total_Lineage_B.1.351': string;
    'Total_Lineage_P.1': string;
}


const stream = createReadStream('./data/raw/covidtesting.csv').pipe(csv({
      mapHeaders: ({ header, index }) => header.trim()
}))
const outFile = './data/province_cases.json';

interface Variant {
    newCases: number;
    totalCases: number;
}

interface DayData {
    date: string;

    totalCases: number;
    newCases: number;

    newTests: number;
    testPositivity: number;

    totalDeaths: number;
    newDeaths: number;

    totalRecovered: number;
    newRecovered: number;

    totalIcu: number;
    newIcu: number;

    totalHospital: number;
    newHospital: number;

    activeCases: number;

    variants: Record<string, Variant>;
}

const caseData = {
    cases: [] as DayData[],
};

stream.on('data', (row: Row) => {
    const previousDay = caseData.cases[caseData.cases.length - 1];

    const today: DayData = {
        date: row['Reported Date'],

        totalCases: Number(row['Total Cases']),
        newCases: Number(row['Total Cases']),

        newTests: Number(row['Total tests completed in the last day']),
        testPositivity: Number(row['Percent positive tests in last day']),

        newDeaths: Number(row['Deaths']),
        totalDeaths: Number(row['Deaths']),

        newRecovered: Number(row['Resolved']),
        totalRecovered: Number(row['Resolved']),

        newIcu: Number(row['Number of patients in ICU with COVID-19']),
        totalIcu: Number(row['Number of patients in ICU with COVID-19']),

        newHospital: Number(row['Number of patients hospitalized with COVID-19']),
        totalHospital: Number(row['Number of patients hospitalized with COVID-19']),

        activeCases: -1,

        variants: {},
    };

    today.activeCases = today.totalCases - today.totalDeaths - today.totalRecovered;


    // TODO Add variants

    if (previousDay) {
        today.newCases = today.totalCases - previousDay.totalCases;
        today.newDeaths = today.totalDeaths - previousDay.totalDeaths;
        today.newHospital = today.totalHospital - previousDay.totalHospital;
        today.newIcu = today.totalIcu - previousDay.totalIcu;
    }

    caseData.cases.push(today);
});

stream.on('end', () => {
    writeFileSync(outFile, JSON.stringify(caseData));
    console.log(caseData.cases[caseData.cases.length - 1]);
});

