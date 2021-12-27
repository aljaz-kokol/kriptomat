export class Coin {
  public static readonly apiName = 'name';
  private readonly _name: string;

  public static readonly apiDays = 'days';
  private readonly _days: {date: string; price: number}[];

  constructor(name: string, days: { date: string; price: number }[]) {
    this._name = name;
    this._days = days;
  }
}
