export class Coin {
    private readonly _name: string;
    private readonly _price: string[];
    private readonly _priceNum: number[]

    public constructor(name: string, price: string[]) {
        this._name = name;
        this._price = price;
        this._priceNum = [];
        this._price.forEach(item => this._priceNum.push(parseFloat(item.replace(',', '.'))))
    }

    get name(): string {
        return this._name;
    }

    get price(): number[] {
        return  [...this._priceNum];
    }

    public static fromJsonList(json: any[]): Coin[] {
        const coins: Coin[] = [];
        json.forEach(data => {
            coins.push(new Coin(data['name'], data['price']))
        })
        return coins;
    }
}
