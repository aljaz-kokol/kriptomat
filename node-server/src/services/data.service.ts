import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';

export class DataService {
    private static _instance: DataService;
    private static readonly _file: string = 'price-data21122021.csv';
    private constructor() {}

    public static get get(): DataService {
        if (!DataService._instance)
            DataService._instance = new DataService();
        return DataService._instance;
    }

    async getData(): Promise<any[]> {
        const csvData: any[] = [];
        return new Promise(resolve => fs.createReadStream(path.join(__dirname, '..', DataService._file))
            .pipe(csv({
                separator: ';',

            }))
            .on('data', (row)=> {
                csvData.push(row);
            }).on('end', () => {
                resolve(csvData);
        }));
    }

}
