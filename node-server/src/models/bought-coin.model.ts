export class BoughtCoin {
    public static readonly jsonName = '_name';
    private readonly _name: string;

    public static readonly jsonPercentage = '_percentage';
    private readonly _percentage: number;

    public static readonly jsonBoughtOn = '_boughtOn';
    private readonly _boughtOn: string;


    constructor(name: string, percentage: number, boughtOn: string) {
        this._name = name;
        this._percentage = percentage;
        this._boughtOn = boughtOn;
    }


    get name(): string {
        return this._name;
    }

    get percentage(): number {
        return this._percentage;
    }

    get boughtOn(): string {
        return this._boughtOn;
    }

    static fromJsonList(jsonList: any[]): BoughtCoin[] {
        const list: BoughtCoin[] = []
        jsonList.forEach(json => {
            list.push(new BoughtCoin(json[this.jsonName], json[this.jsonPercentage], json[this.jsonBoughtOn]))
        })
        return list;
    }
}
