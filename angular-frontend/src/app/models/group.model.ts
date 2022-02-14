import {ApiCoin, Coin} from "./coin.model";

export interface ApiGroup {
  _id: string;
  name: string;
  note: string;
  coins: ApiCoin[];
  createdAt: Date;
  updatedAt: Date;
}

export class Group {
  constructor(public id: string,
              public name: string,
              public note: string,
              private _coins: Coin[],
              private _createdAt: Date,
              private _updatedAt: Date) {}

  public get createdAt(): string {
    const dateStr = this._createdAt.toLocaleDateString().split('.').map(datePart => datePart.trim().padStart(2, '0')).join ('.');
    return `${dateStr}`;
  }

  public get coins(): Coin[] {
    return [...this._coins];
  }

  public static fromApiGroup(apiGroup: ApiGroup): Group {
    return new Group(
      apiGroup._id,
      apiGroup.name,
      apiGroup.note,
      Coin.fromApiCoinList(apiGroup.coins),
      new Date(apiGroup.createdAt),
      new Date(apiGroup.updatedAt),
    );
  }

  public static fromApiGroupList(apiGroupList: ApiGroup[]): Group[] {
    const groups: Group[] = [];
    for (const apiGroup of apiGroupList)
      groups.push(Group.fromApiGroup(apiGroup));
    return groups;
  }
}
