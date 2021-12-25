export class Coin {
  private static readonly _apiName: string = 'name';
  private static readonly _apiDays: string = 'days';

  private readonly _name: string;
  private readonly _days: {date: string; price: number}[];


  constructor(name: string, days: { date: string; price: number }[]) {
    this._name = name;
    this._days = days;
  }


  get name(): string {
    return this._name;
  }

  get days(): { date: string; price: number }[] {
    return [...this._days];
  }

  public static fromJson(json): Coin {
    return new Coin(
      json[this._apiName],
      json[this._apiDays]
    );
  }
}
