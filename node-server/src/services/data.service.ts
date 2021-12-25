import csv from 'csv-parser';
import fs from 'fs';
import path from 'path';
import util from 'util';

const readFile = util.promisify(fs.readFile);

export class DataService {
    private static _instance: DataService;
    private static readonly _file: string = 'price-data21122021.csv';
    private constructor() {}

    public static get get(): DataService {
        if (!DataService._instance)
            DataService._instance = new DataService();
        return DataService._instance;
    }

    async getData(): Promise<string> {
        const datra
        return new Promise(resolve => fs.createReadStream(path.join(__dirname, '..', DataService._file)).pipe(csv())
            .on('data', row => {
            }).on('end', () => {
                resolve('AAAAAAAAAAA');
        }));
    }

}
