export class Coin {
    private readonly _name: string;
    private readonly _price: string[];
    private readonly _priceNum: number[]

    public constructor(name: string, price: string[]) {
        this._name = name;
        this._price = price;
        this._priceNum = [];
        this._price.forEach(item => {
            let num = parseFloat(item.replace(',', '.'));
            if (isNaN(num))
                num = -1;
            this._priceNum.push(num)
        })
    }

    get name(): string {
        return this._name;
    }

    get price(): number[] {
        return  [...this._priceNum].map((price, index) => {
            if (price < 0) {
                let counter = 0;
                while (true) {
                    if (this._priceNum[index - counter] >= 0) {
                        return this._priceNum[index - counter];
                    }
                    counter++;
                }
            }
            return price;
        });
    }

    public static fromJsonList(json: any[]): Coin[] {
        const coins: Coin[] = [];
        json.forEach(data => {
            coins.push(new Coin(data['name'], data['price']))
        })
        return coins;
    }
}
